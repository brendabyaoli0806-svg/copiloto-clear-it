# Knowledge Base — LGPD e Segurança de Dados

> Referência técnica para o Squad Tech Tigers · Copiloto de Suporte L1

---

## 1. O que é a LGPD?

A **Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018)** é a legislação brasileira que regula o tratamento de dados pessoais por pessoas físicas e jurídicas, de direito público ou privado. Entrou em vigor em setembro de 2020.

### Princípios fundamentais

| Princípio | Descrição | Implicação para o Copiloto |
|---|---|---|
| **Finalidade** | Dados devem ser tratados para propósitos legítimos e específicos | O Copiloto só pode usar dados de tickets para sugerir diagnósticos |
| **Adequação** | Tratamento compatível com a finalidade informada | Não usar dados de tickets para outros fins (marketing, perfil) |
| **Necessidade** | Limitar ao mínimo necessário | Enviar ao LLM apenas o necessário para o diagnóstico, não o ticket inteiro |
| **Livre Acesso** | Titular pode consultar seus dados | Clear IT deve permitir que clientes saibam como seus dados são tratados |
| **Segurança** | Medidas técnicas para proteger dados | Criptografia, mascaramento, controle de acesso |
| **Não Discriminação** | Proibido tratamento para fins discriminatórios | O Copiloto não pode priorizar/despriorizartickets com base em dados pessoais |

---

## 2. Dados Pessoais em Tickets de Suporte

### O que é dado pessoal?

> **Dado pessoal** é qualquer informação relacionada a pessoa natural identificada ou identificável (Art. 5º, I).

### Tipos de dados pessoais encontrados em tickets

| Tipo | Exemplos | Risco |
|---|---|---|
| **Dados de identificação** | Nome, e-mail, CPF, telefone do solicitante | 🔴 Alto |
| **Dados de infraestrutura** | Endereço IP, hostname, MAC address | 🟠 Médio (pode identificar indiretamente) |
| **Credenciais** | Usuários, senhas parciais, tokens expostos em logs | 🔴 Crítico |
| **Dados de aplicação** | Logs com informações de negócio do cliente | 🟠 Médio |
| **Dados de localização** | Endereço físico, geolocalização do dispositivo | 🟡 Médio |
| **Dados sensíveis (Art. 11)** | Dados de saúde, biometria, orientação | 🔴 Crítico |

---

## 3. Estratégia de Mascaramento (Anonymization)

### O que mascarar antes de enviar ao LLM

| Dado | Padrão de detecção | Substituição |
|---|---|---|
| **E-mail** | `\w+@\w+\.\w+` | `[EMAIL_MASCARADO]` |
| **CPF** | `\d{3}\.\d{3}\.\d{3}-\d{2}` | `[CPF_MASCARADO]` |
| **Telefone** | `\(\d{2}\)\s?\d{4,5}-\d{4}` | `[TELEFONE_MASCARADO]` |
| **IP (v4)** | `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}` | `[IP_MASCARADO]` |
| **Senha/Token** | Contexto de credencial + string alfanumérica | `[CREDENCIAL_MASCARADA]` |
| **Nome próprio** | NER (Named Entity Recognition) | `[NOME_MASCARADO]` |
| **Hostname** | Padrões internos do cliente (ex: `SRV-PROD-*`) | `[HOST_MASCARADO]` |

### Ferramentas de mascaramento

| Ferramenta | Tipo | Suporte a PT-BR | Licença |
|---|---|---|---|
| **Microsoft Presidio** | NER + regex | Parcial (personalizável) | MIT |
| **spaCy (pt_core_news_lg)** | NER | Sim | MIT |
| **Regex customizado** | Padrões fixos | Sim | — |
| **Google DLP API** | Cloud | Sim | Pago |

### Pipeline de mascaramento sugerido

```
Ticket bruto (FreshService)
       │
       ▼
┌──────────────────┐
│ Pré-processamento│
│ • Remove HTML    │
│ • Normaliza texto│
└───────┬──────────┘
        │
        ▼
┌──────────────────┐
│ Mascaramento     │
│ • Regex (CPF,    │
│   email, IP,     │
│   telefone)      │
│ • NER (nomes,    │
│   organizações)  │
└───────┬──────────┘
        │
        ▼
┌──────────────────┐
│ Validação        │
│ • Log de itens   │
│   mascarados     │
│ • Alerta se PII  │
│   detectado após │
│   mascaramento   │
└───────┬──────────┘
        │
        ▼
  Texto seguro → LLM
```

---

## 4. Controle de Acesso e Auditoria

### Princípio do Menor Privilégio

| Componente | Acesso necessário | Acesso proibido |
|---|---|---|
| **Backend do Copiloto** | Leitura de tickets, escrita de notas internas | Edição/exclusão de tickets, acesso a dados financeiros |
| **LLM (API externa)** | Receber texto mascarado | Receber dados pessoais brutos |
| **Vector Store** | Leitura/escrita de embeddings | Acesso a dados brutos originais |
| **Dashboard de feedback** | Leitura de métricas agregadas | Acesso a dados individuais de analistas |

### Requisitos de auditoria

| Evento | O que registrar | Retenção |
|---|---|---|
| **Sugestão gerada** | ID do ticket, timestamp, hash do prompt (sem PII), nível de confiança | 12 meses |
| **Feedback do analista** | ID do ticket, ID do analista, ação (aceita/editada/rejeitada), timestamp | 12 meses |
| **Mascaramento** | Quantidade de itens mascarados por tipo, alertas | 6 meses |
| **Erro/Falha** | Tipo de erro, stack trace (sem PII), timestamp | 6 meses |

### Formato de log sugerido

```json
{
  "event": "suggestion_generated",
  "ticket_id": "TK-2026-04521",
  "timestamp": "2026-06-25T15:30:00Z",
  "confidence": "alto",
  "pii_items_masked": 3,
  "pii_types_masked": ["email", "ip", "nome"],
  "latency_ms": 4200,
  "model": "gpt-4o-mini",
  "analyst_id": "agent-042",
  "feedback": null
}
```

---

## 5. Conformidade — Checklist

### Antes do go-live

- [ ] **Mapeamento de dados:** Documentar quais dados pessoais são tratados, de quem, para quê
- [ ] **Mascaramento implementado:** Nenhum dado pessoal é enviado ao LLM sem mascaramento
- [ ] **Teste de penetração:** Validar que o pipeline de mascaramento não tem bypass
- [ ] **Política de privacidade:** Atualizar para incluir uso de IA no tratamento de tickets
- [ ] **Consentimento:** Verificar se o contrato com clientes da Clear IT permite uso de dados para IA
- [ ] **DPIA:** Relatório de Impacto à Proteção de Dados (Art. 38) — documentar riscos e mitigações
- [ ] **Logs de auditoria:** Implementar e testar rastreabilidade completa
- [ ] **Encarregado (DPO):** Verificar se a Clear IT tem DPO designado e informá-lo

### Durante operação

- [ ] Monitorar alertas de PII não mascarado
- [ ] Revisar logs de auditoria mensalmente
- [ ] Atualizar padrões de mascaramento conforme novos tipos de dados surgem
- [ ] Responder a requisições de titulares (acesso, exclusão, portabilidade)

---

## 6. Regras de Ouro para o Copiloto

| # | Regra | Consequência se violada |
|---|---|---|
| 1 | **Mascara tudo antes de enviar ao LLM** | Violação de LGPD, risco de multa e dano reputacional |
| 2 | **Nunca armazena dados pessoais brutos fora do FreshService** | O FreshService é o sistema de registro; dados pessoais não devem ser duplicados |
| 3 | **Toda sugestão é rastreável** | Sem auditoria, a Clear IT não pode provar conformidade |
| 4 | **O analista decide, não o Copiloto** | Responsabilidade legal permanece com o humano |
| 5 | **Logs não contêm PII** | Logs são frequentemente menos protegidos que sistemas primários |
| 6 | **Dados são processados, não retidos** | O Copiloto não mantém histórico de conversas com dados de clientes |

---

## 7. Artigos da LGPD mais relevantes

| Artigo | Tema | Relevância para o Copiloto |
|---|---|---|
| **Art. 5º** | Definições (dado pessoal, tratamento, controlador) | Base conceitual |
| **Art. 6º** | Princípios (finalidade, necessidade, segurança) | Guia todas as decisões de design |
| **Art. 7º** | Bases legais para tratamento | Determinar qual base legal autoriza o uso de dados de tickets |
| **Art. 11** | Dados sensíveis | Caso tickets contenham dados de saúde/biometria |
| **Art. 18** | Direitos do titular | Requisições de acesso, exclusão, portabilidade |
| **Art. 37** | Registro de tratamento | Documentar operações de tratamento |
| **Art. 38** | DPIA (Relatório de Impacto) | Obrigatório quando tratamento pode gerar riscos |
| **Art. 46** | Medidas de segurança | Criptografia, mascaramento, controle de acesso |
| **Art. 52** | Sanções administrativas | Multa de até 2% do faturamento (teto R$ 50M por infração) |

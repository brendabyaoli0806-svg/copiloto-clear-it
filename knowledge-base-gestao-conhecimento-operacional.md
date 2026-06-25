# Knowledge Base — Gestão de Conhecimento Operacional

> Referência técnica para o Squad Tech Tigers · Copiloto de Suporte L1

---

## 1. Por que Gestão de Conhecimento?

O problema central da Clear IT **não é falta de ferramenta** — é que o conhecimento necessário para resolver incidentes está:

| Estado atual | Impacto |
|---|---|
| **Disperso** | Espalhado entre wikis, tickets antigos, e-mails, cabeça dos seniores |
| **Não estruturado** | Sem formato padronizado — cada analista documenta de um jeito (ou não documenta) |
| **Inacessível** | No momento da crise, o analista L1 não sabe onde buscar nem o que buscar |
| **Tácito** | O conhecimento mais valioso está na experiência dos analistas L2/L3, não escrito em lugar nenhum |

> **Insight fundamental:** O Copiloto de IA é, na essência, um sistema de gestão de conhecimento em tempo real — ele captura, estrutura e entrega conhecimento no momento exato da necessidade.

---

## 2. Tipos de Conhecimento em Suporte

### Modelo DIKW (Data → Information → Knowledge → Wisdom)

```
┌─────────────────────────────────────────────────┐
│                   WISDOM                        │
│  "Saber quando NÃO seguir o procedimento"       │
│  Experiência + julgamento do sênior              │
├─────────────────────────────────────────────────┤
│                  KNOWLEDGE                      │
│  "Se o servidor apresenta erro X em contexto Y,│
│   a causa raiz é Z e a ação é W"                │
├─────────────────────────────────────────────────┤
│                 INFORMATION                     │
│  "O servidor SRV-PROD-01 apresentou erro 500    │
│   nos últimos 30 minutos"                       │
├─────────────────────────────────────────────────┤
│                    DATA                         │
│  Logs, métricas, alertas, timestamps            │
└─────────────────────────────────────────────────┘
```

### Conhecimento Explícito vs. Tácito

| Tipo | Definição | Exemplos no suporte | Capturável pelo Copiloto? |
|---|---|---|---|
| **Explícito** | Documentado, formal, transferível | KB articles, runbooks, scripts de diagnóstico | ✅ Sim — indexar e buscar |
| **Tácito** | Na mente do analista, informal, difícil de transferir | "Quando o cliente X liga, geralmente é o firewall" | ⚠️ Parcialmente — capturar via notas de resolução |

---

## 3. Fontes de Conhecimento na Clear IT

| Fonte | Tipo | Qualidade esperada | Estratégia de captura |
|---|---|---|---|
| **Knowledge Base do FreshService** | Explícito | Variável — pode estar desatualizada | API → indexar artigos |
| **Tickets resolvidos** | Semi-explícito | Alta — resolução real documentada | API → extrair padrão {problema → diagnóstico → solução} |
| **Notas internas dos analistas** | Tácito tornando-se explícito | Variável — depende do analista | API → filtrar notas com valor diagnóstico |
| **Runbooks / SOPs** | Explícito | Alta — procedimentos validados | Documentos → parsing → indexação |
| **Conversas informais** | Tácito | Baixa — efêmero | ❌ Não capturável diretamente |
| **Treinamentos gravados** | Semi-explícito | Média | Transcrição → indexação |

---

## 4. Estrutura de um Artigo de Conhecimento

### Template padrão para KB

```markdown
# [Título: Sintoma Principal]

## Sintomas
- Sintoma 1
- Sintoma 2
- Sintoma 3

## Ambiente / Contexto
- Serviço afetado: [nome do serviço]
- Plataforma: [Windows/Linux/Cloud]
- Frequência: [intermitente/constante/única]

## Causa Raiz
[Descrição clara da causa raiz identificada]

## Resolução
1. Passo 1
2. Passo 2
3. Passo 3

## Verificação
- [ ] Como confirmar que o problema foi resolvido

## Referências
- Ticket(s) original(is): [TK-XXXX]
- Documentação externa: [link]

## Metadata
- Última atualização: [data]
- Autor: [analista]
- Categoria: [Infraestrutura/Rede/Cloud/Segurança/Aplicação]
- Confiança: [Alta/Média/Baixa]
```

> **Para o Copiloto:** Artigos neste formato são ideais para indexação RAG porque têm separação clara entre sintoma, causa e solução.

---

## 5. Padrões de Resolução

### Os 5 padrões mais comuns em suporte L1

| Padrão | Descrição | Exemplo |
|---|---|---|
| **Reset & Retry** | Reiniciar serviço/sessão/dispositivo resolve | "Reinicie o serviço Apache" |
| **Config Fix** | Ajuste de configuração específica | "Altere o timeout do load balancer de 30s para 60s" |
| **Known Error** | Problema documentado com workaround | "Bug no driver v2.3 — downgrade para v2.2" |
| **Permission Issue** | Problema de permissão/acesso | "Usuário precisa ser adicionado ao grupo AD X" |
| **Resource Exhaustion** | Recurso esgotado (disco, memória, CPU) | "Disco em /var está 100% — limpar logs antigos" |

> **Para o Copiloto:** Classificar a sugestão por padrão ajuda o analista a entender o tipo de ação necessária.

---

## 6. Ciclo de Vida do Conhecimento

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Criar   │────▶│ Validar  │────▶│ Publicar │────▶│  Usar    │
│          │     │          │     │          │     │          │
└──────────┘     └──────────┘     └──────────┘     └─────┬────┘
     ▲                                                    │
     │           ┌──────────┐     ┌──────────┐           │
     └───────────│ Atualizar│◀────│ Revisar  │◀──────────┘
                 └──────────┘     └──────────┘
```

| Fase | Responsável | Ação |
|---|---|---|
| **Criar** | Analista que resolveu o incidente | Documentar solução no formato padrão |
| **Validar** | Analista L2/L3 | Verificar se a solução está correta e completa |
| **Publicar** | Gestor da KB | Aprovar e disponibilizar na Knowledge Base |
| **Usar** | Analista L1 (ou Copiloto) | Consultar durante resolução de incidentes |
| **Revisar** | Feedback do uso | Identificar artigos desatualizados ou incompletos |
| **Atualizar** | Analista responsável | Corrigir, complementar ou depreciar o artigo |

### Indicadores de saúde da KB

| Indicador | Meta | Medição |
|---|---|---|
| **Cobertura** | ≥ 80% das categorias de incidente têm artigo | Categorias com artigo / Total de categorias |
| **Uso** | Artigos são consultados antes de escalar | Views de artigos vs. tickets na mesma categoria |
| **Atualidade** | < 10% dos artigos desatualizados | Artigos sem revisão > 6 meses / Total |
| **Acurácia** | ≥ 90% das soluções são confirmadas corretas | Feedback de analistas |

---

## 7. De Tickets Resolvidos para Conhecimento

### Transformação automática

O Copiloto pode ajudar a **converter tickets resolvidos em artigos de KB** usando o seguinte pipeline:

```
Ticket resolvido
       │
       ▼
┌────────────────────┐
│ Extração           │
│ • Sintoma (título  │
│   + descrição)     │
│ • Diagnóstico      │
│   (notas internas) │
│ • Resolução (ação  │
│   final)           │
└───────┬────────────┘
        │
        ▼
┌────────────────────┐
│ Clusterização      │
│ • Agrupar tickets  │
│   com mesmo tipo   │
│   de problema      │
│ • Identificar      │
│   padrão recorrente│
└───────┬────────────┘
        │
        ▼
┌────────────────────┐
│ Geração de artigo  │
│ • LLM sintetiza    │
│   múltiplos tickets│
│   em artigo único  │
│ • Formato padrão   │
└───────┬────────────┘
        │
        ▼
  Rascunho para revisão L2/L3
```

> **Benefício:** Mesmo que a KB esteja vazia hoje, o Copiloto pode construí-la retroativamente a partir do histórico de tickets.

---

## 8. Métricas de Knowledge Management

| Métrica | Fórmula | Meta |
|---|---|---|
| **Knowledge Reuse Rate** | Tickets resolvidos usando KB / Total de tickets | ≥ 40% |
| **Time to Knowledge** | Tempo entre resolução de um incidente novo e publicação do artigo | ≤ 48h |
| **Knowledge Gap Rate** | Tickets sem artigo correspondente na KB / Total de tickets | ≤ 20% |
| **Contribution Rate** | Analistas que contribuíram para KB no mês / Total de analistas | ≥ 50% |

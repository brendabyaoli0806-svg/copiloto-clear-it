# Knowledge Base — Gestão de Incidentes ITSM

> Referência técnica para o Squad Tech Tigers · Copiloto de Suporte L1

---

## 1. O que é ITSM?

**IT Service Management (ITSM)** é o conjunto de práticas, políticas e processos que uma organização usa para planejar, entregar, operar e controlar os serviços de TI oferecidos a seus clientes. O framework mais adotado é o **ITIL (Information Technology Infrastructure Library)**.

### ITIL v4 — Conceitos-chave

| Conceito | Definição |
|---|---|
| **Serviço** | Meio de entregar valor ao cliente sem que ele gerencie custos e riscos específicos |
| **Incidente** | Interrupção não planejada de um serviço de TI ou redução na qualidade dele |
| **Problema** | Causa raiz (desconhecida ou conhecida) de um ou mais incidentes |
| **Mudança (Change)** | Adição, modificação ou remoção de qualquer coisa que possa afetar serviços de TI |
| **Conhecimento** | Informação contextualizada usada para tomar decisões e resolver incidentes |

---

## 2. Ciclo de Vida de um Incidente

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌────────────┐
│  Detecção /  │────▶│ Classificação│────▶│  Diagnóstico │────▶│  Resolução   │────▶│ Fechamento │
│  Registro   │     │ & Priorização│     │ & Investigação│    │ & Recuperação│     │ & Revisão  │
└─────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └────────────┘
```

### Detalhamento

| Fase | O que acontece | Quem faz |
|---|---|---|
| **Detecção / Registro** | Ticket é aberto via portal, e-mail, telefone ou monitoramento automático | Usuário final / Sistema de alerta |
| **Classificação & Priorização** | Categorização (tipo, serviço afetado) + definição de prioridade (impacto × urgência) | Analista L1 |
| **Diagnóstico & Investigação** | Análise de causa raiz, consulta a KB, tentativa de resolução | Analista L1 → L2 → L3 |
| **Resolução & Recuperação** | Aplicação do fix, restauração do serviço, validação com o cliente | Analista responsável |
| **Fechamento & Revisão** | Documentação da solução, feedback do cliente, atualização da KB | Analista responsável |

---

## 3. Níveis de Suporte

| Nível | Perfil | Responsabilidade | % esperado de resolução |
|---|---|---|---|
| **L1 (Primeiro Nível)** | Generalista, menor experiência | Triagem, troubleshooting básico, uso de scripts/KB | 60–70% dos tickets |
| **L2 (Segundo Nível)** | Especialista por domínio | Diagnóstico aprofundado, análise de logs, configuração | 20–30% dos tickets |
| **L3 (Terceiro Nível)** | Expert / Engenheiro | Problemas complexos, bugs de produto, mudanças estruturais | 5–10% dos tickets |

### O problema do escalonamento

Quando L1 não resolve, o ticket é **escalonado** para L2/L3. Isso:
- Aumenta o **MTTR** (mais gente, mais handoff, mais contexto perdido)
- Reduz o **FCR** (o cliente não teve resolução no primeiro contato)
- Congestiona os seniores com problemas que já tinham solução conhecida

> **Insight para o Copiloto:** Se 40% dos escalonamentos L1→L2 são para problemas com solução documentada, o Copiloto pode eliminar esse desperdício entregando a solução na hora certa.

---

## 4. Métricas Fundamentais

### MTTR — Mean Time to Resolve

$$MTTR = \frac{\sum \text{Tempo de resolução de todos os incidentes}}{\text{Número total de incidentes resolvidos}}$$

| Benchmark | Valor típico |
|---|---|
| Excelente | < 2 horas |
| Bom | 2–4 horas |
| Mediano | 4–8 horas |
| Crítico | > 8 horas |

**Como o Copiloto impacta:** Reduz o tempo de diagnóstico (fase mais demorada) ao sugerir causa raiz + ações antes do analista precisar pesquisar.

### FCR — First Contact Resolution

$$FCR = \frac{\text{Tickets resolvidos no primeiro contato}}{\text{Total de tickets}} \times 100$$

| Benchmark | Valor típico |
|---|---|
| Excelente | > 80% |
| Bom | 70–80% |
| Mediano | 60–70% |
| Crítico | < 60% |

**Como o Copiloto impacta:** Dá ao L1 informação suficiente para resolver sem escalar, aumentando a taxa de resolução no primeiro contato.

### Outras métricas relevantes

| Métrica | Definição |
|---|---|
| **MTTA** (Mean Time to Acknowledge) | Tempo entre criação do ticket e primeiro contato do analista |
| **Taxa de Escalonamento** | % de tickets que saem do L1 para L2/L3 |
| **Taxa de Reabertura** | % de tickets reabertos após fechamento (indica resolução incompleta) |
| **CSAT** (Customer Satisfaction) | Satisfação do cliente com o atendimento |

---

## 5. Matriz de Prioridade

A prioridade de um incidente é definida pelo cruzamento de **Impacto** × **Urgência**:

| | Urgência Alta | Urgência Média | Urgência Baixa |
|---|---|---|---|
| **Impacto Alto** | 🔴 P1 — Crítico | 🟠 P2 — Alto | 🟡 P3 — Médio |
| **Impacto Médio** | 🟠 P2 — Alto | 🟡 P3 — Médio | 🟢 P4 — Baixo |
| **Impacto Baixo** | 🟡 P3 — Médio | 🟢 P4 — Baixo | ⚪ P5 — Planejado |

| Prioridade | SLA típico (resolução) | Exemplo |
|---|---|---|
| P1 — Crítico | 1–4 horas | Servidor de produção fora do ar |
| P2 — Alto | 4–8 horas | Serviço degradado com impacto em múltiplos clientes |
| P3 — Médio | 1–2 dias úteis | Funcionalidade não-crítica indisponível |
| P4 — Baixo | 3–5 dias úteis | Solicitação de configuração |
| P5 — Planejado | Agendado | Melhoria programada |

---

## 6. Taxonomia de Incidentes

### Categorias comuns em MSP/NOC

| Categoria | Subcategorias | Exemplo |
|---|---|---|
| **Infraestrutura** | Servidor, Storage, Rede, Firewall | Servidor não responde a ping |
| **Cloud** | AWS, Azure, GCP, Backup em nuvem | Instância EC2 com CPU 100% |
| **Segurança** | Malware, Acesso indevido, Vulnerabilidade | Alerta de ransomware em endpoint |
| **Aplicação** | ERP, CRM, E-mail, Portal | Outlook não sincroniza |
| **Rede** | DNS, DHCP, VPN, Link WAN | VPN não conecta para usuários remotos |
| **Endpoint** | Desktop, Notebook, Impressora | Tela azul recorrente |

> **Relevância para o Copiloto:** A categorização correta é essencial para buscar soluções na base de conhecimento. O Copiloto pode sugerir a categoria automaticamente com base no texto do ticket.

---

## 7. FreshService — Conceitos-chave

O **FreshService** (Freshworks) é a plataforma ITSM usada pela Clear IT.

### Objetos principais

| Objeto | Função |
|---|---|
| **Ticket** | Registro de um incidente ou solicitação |
| **Agent** | Analista de suporte (L1, L2, L3) |
| **Requester** | Pessoa que abriu o chamado |
| **Note (Nota)** | Comentário interno (visível só para agents) ou público (visível para requester) |
| **Knowledge Base Article** | Artigo de solução na base de conhecimento |
| **Automation Rule** | Regra que executa ações automáticas (atribuição, notificação, etc.) |

### Fluxo típico de um ticket

```
Requester abre ticket
       │
       ▼
Automation Rule classifica e atribui ao grupo L1
       │
       ▼
Agent L1 recebe → diagnostica → resolve OU escala
       │                                    │
       ▼                                    ▼
   Fecha ticket                     Agent L2 recebe
                                         │
                                         ▼
                                    Resolve e fecha
```

### API FreshService — Endpoints relevantes

| Endpoint | Método | Uso |
|---|---|---|
| `/api/v2/tickets` | GET | Listar/buscar tickets |
| `/api/v2/tickets/{id}` | GET | Detalhes de um ticket |
| `/api/v2/tickets/{id}/notes` | POST | Criar nota interna no ticket |
| `/api/v2/tickets` | POST | Criar novo ticket |
| `/api/v2/solutions/articles` | GET | Buscar artigos na KB |

> **Para o Copiloto:** O ponto de integração mais provável é um **webhook on ticket creation** que dispara a análise, e um **POST de nota interna** que insere a sugestão diretamente no ticket.

---

## 8. Glossário

| Termo | Definição |
|---|---|
| **SLA** | Service Level Agreement — acordo de nível de serviço |
| **MSP** | Managed Service Provider — provedor de serviços gerenciados |
| **NOC** | Network Operations Center — centro de operações de rede |
| **KB** | Knowledge Base — base de conhecimento |
| **CMDB** | Configuration Management Database — banco de dados de configuração |
| **CI** | Configuration Item — item de configuração no CMDB |
| **Workaround** | Solução temporária/paliativa para um incidente |
| **Root Cause** | Causa raiz do problema |
| **Known Error** | Problema com causa raiz identificada e workaround documentado |
| **Runbook** | Procedimento passo-a-passo para resolver um tipo específico de incidente |

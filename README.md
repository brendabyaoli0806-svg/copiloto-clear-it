# Knowledge Base — Mapa de Navegação

> Índice dos documentos de referência técnica · Squad Tech Tigers · PPM 2026

---

## Documentos do Projeto

| Documento | Descrição |
|---|---|
| [TECH TIGERS - PPM 2026.md](../TECH%20TIGERS%20-%20PPM%202026.md) | Transcrição das 3 abas da planilha original (Squad, Atividades Kick-Off, Lição de Casa) |
| [business-context-lite.md](../business-context-lite.md) | Contexto de negócio consolidado: problema, dores, visão, KPIs, user story, restrições e critérios de aceite |

---

## Knowledge Bases por Tema

| # | Documento | Tema | O que você encontra |
|---|---|---|---|
| 1 | [knowledge-base-gestao-incidentes-itsm.md](./knowledge-base-gestao-incidentes-itsm.md) | **Gestão de Incidentes & ITSM** | Ciclo de vida do incidente, níveis L1/L2/L3, métricas (MTTR, FCR), matriz de prioridade, taxonomia, FreshService (conceitos + API), glossário |
| 2 | [knowledge-base-copiloto-ia-rag.md](./knowledge-base-copiloto-ia-rag.md) | **Copiloto IA & Arquitetura RAG** | O que é um copiloto, arquitetura RAG, fontes de dados, prompt engineering, avaliação de qualidade, integração FreshService, stack tecnológica, riscos |
| 3 | [knowledge-base-lgpd-seguranca-dados.md](./knowledge-base-lgpd-seguranca-dados.md) | **LGPD & Segurança de Dados** | Princípios da LGPD, dados pessoais em tickets, mascaramento (Presidio/regex), controle de acesso, auditoria, checklist de conformidade, artigos relevantes |
| 4 | [knowledge-base-gestao-conhecimento-operacional.md](./knowledge-base-gestao-conhecimento-operacional.md) | **Gestão de Conhecimento Operacional** | Tipos de conhecimento (explícito/tácito), fontes, template de artigo KB, padrões de resolução, ciclo de vida, conversão ticket→KB, métricas de KM |

---

## Como usar este material

### Por papel no squad

| Papel | Comece por | Aprofunde em |
|---|---|---|
| **Tecnologia e Produto** | KB Copiloto IA & RAG → KB ITSM | KB LGPD → KB Gestão de Conhecimento |
| **Negócios e Estratégia** | business-context-lite → KB ITSM | KB Gestão de Conhecimento → KB LGPD |

### Por momento do projeto

| Fase | Documentos prioritários |
|---|---|
| **Entendimento do problema** | business-context-lite + KB ITSM |
| **Design da solução** | KB Copiloto IA & RAG + KB Gestão de Conhecimento |
| **Implementação** | KB Copiloto IA & RAG (stack, integração, prompts) |
| **Validação e compliance** | KB LGPD + Critérios de Aceite (business-context-lite §9) |
| **Apresentação / Pitch** | business-context-lite + métricas dos KBs |

---

## Estrutura de pastas

```
projeto pulse mais/
├── TECH TIGERS - PPM 2026.xlsx          ← Planilha original
├── TECH TIGERS - PPM 2026.md           ← Transcrição da planilha
├── business-context-lite.md            ← Contexto de negócio
└── docs/
    ├── README.md                        ← Este arquivo (índice)
    ├── knowledge-base-gestao-incidentes-itsm.md
    ├── knowledge-base-copiloto-ia-rag.md
    ├── knowledge-base-lgpd-seguranca-dados.md
    └── knowledge-base-gestao-conhecimento-operacional.md
```

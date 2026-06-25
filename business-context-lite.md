# Business Context Lite

> **Squad:** Tech Tigers · **Código:** B.4 · **Desafio:** B – Serviços (Clear IT)

---

## 1. Problema Central

A Clear IT perdeu o controle sobre o tempo que leva para resolver incidentes porque o conhecimento técnico necessário para diagnosticá-los está **disperso, não estruturado e inacessível** no momento da crise.

O que parece um problema de ferramentas é, na verdade, um problema de **gestão de conhecimento operacional em tempo real**: cada analista L1 começa do zero, toda vez, mesmo quando a solução já existe em algum ticket fechado ou na cabeça de um sênior.

### Quem sofre?

| Persona | Dor |
|---|---|
| **Analista L1** | Precisa consultar múltiplas fontes manualmente, sem acesso rápido a diagnósticos anteriores. Perde tempo, erra mais, e escala tickets que poderia resolver sozinho. |
| **Analista L2/L3 (Sênior)** | É interrompido constantemente para resolver problemas que já foram resolvidos antes, desperdiçando tempo de especialista em trabalho repetitivo. |
| **Gestão / Operação** | Não consegue reduzir MTTR nem melhorar FCR porque o gargalo é estrutural — não basta contratar mais gente, o conhecimento não flui. |
| **Cliente final** | Sofre com downtime prolongado e respostas lentas porque o suporte depende de escalonamento para resolver incidentes que já possuem solução documentada. |

---

## 2. Dores Priorizadas

| # | Dor | Descrição |
|---|---|---|
| 1 | **Consultas Manuais e Fragmentadas** | O analista L1 precisa buscar informações em múltiplos sistemas, wikis desatualizadas e tickets antigos para tentar montar um diagnóstico. O conhecimento existe, mas é inacessível no momento da crise. |
| 2 | **Curva de Aprendizado e Retrabalho** | Novos analistas demoram semanas para atingir produtividade mínima. Sem base de conhecimento estruturada, cada um aprende por tentativa e erro — repetindo erros que outros já resolveram. |
| 3 | **Gargalos de Handoff e Comunicação** | Escalonamentos desnecessários congestionam o time L2/L3. A falta de contexto estruturado no momento da passagem faz com que o sênior precise re-diagnosticar do zero. |

---

## 3. Visão do Produto

> Que o **conhecimento sênior chegue automaticamente ao analista certo**, no segundo em que ele mais precisa, sem depender de escalonamento ou busca manual.

**Nome interno:** Copiloto de Suporte L1

**O que faz:** Ao abrir um ticket no FreshService, o Copiloto gera automaticamente uma nota interna com:
- Diagnóstico provável (com percentual de confiança)
- Ações recomendadas
- Rascunho de resposta ao cliente

**O que não faz:** Não executa comandos, não age sobre a infraestrutura, não substitui o analista — apenas recomenda.

---

## 4. Impacto Esperado

Ao resolver as 3 dores, a Clear IT ganha **blindagem financeira e operacional**:

| Dimensão | Ganho |
|---|---|
| **Custo Operacional** | Redução de retrabalho e de tempo de sênior desperdiçado em escalonamentos desnecessários |
| **Disponibilidade** | Eliminação de downtime evitável na infraestrutura do cliente |
| **Autonomia L1** | Analistas resolvem mais no primeiro contato, sem depender de busca manual ou interrupção de seniores |
| **Escalabilidade** | Onboarding mais rápido de novos analistas — o Copiloto funciona como mentor digital |

---

## 5. Indicadores de Sucesso (KPIs)

| KPI | O que mede | Meta |
|---|---|---|
| **MTTR** (Tempo Médio de Resolução) | Rapidez na resolução de incidentes L1 | Redução ≥ 15% após 30 dias de uso com grupo piloto |
| **FCR / Taxa de Escalonamento** | % de tickets resolvidos no primeiro contato sem escalar | Aumento mensurável de FCR no grupo com Copiloto vs. grupo controle |

---

## 6. Perguntas de Investigação para a Clear IT

| # | Pergunta | Por que importa |
|---|---|---|
| 1 | Quais são os **números reais de MTTR, FCR e volume de tickets** hoje? | Sem baseline não há como medir impacto. |
| 2 | A **base de conhecimento interna** está estruturada e acessível, ou é informal e dispersa? | Define se o Copiloto terá fonte de dados rica ou precisará construir do zero. |
| 3 | O que a Clear IT define como **escalonamento indevido** versus necessário? | Calibra o modelo para saber quando sugerir resolução L1 vs. recomendar escalonamento. |

---

## 7. User Story

> Como **analista de suporte L1 da Clear IT**,
> quero receber, ao abrir um ticket no FreshService, uma **sugestão estruturada de diagnóstico** com a causa raiz mais provável, as ações recomendadas e um rascunho de resposta ao cliente,
> para que eu possa **resolver incidentes com autonomia** — sem precisar consultar múltiplas fontes manualmente ou interromper um analista sênior — **reduzindo o tempo de atendimento e aumentando minha taxa de resolução no primeiro contato**.

---

## 8. Restrições e Regras de Negócio

| Regra | Descrição |
|---|---|
| 🔒 **LGPD** | Dados de incidentes contendo informações de clientes (logs, IPs, credenciais parciais) **não podem** ser enviados para APIs externas sem anonimização prévia. Todo dado processado pelo LLM deve ser tratado como dado sensível. |
| 🤝 **Confiança** | O Copiloto **nunca** age autonomamente sobre a infraestrutura do cliente. Toda sugestão é uma recomendação; a decisão final é sempre do analista humano. Não há execução automática de comandos. |
| 📋 **Auditoria** | Toda sugestão gerada, bem como a resposta do analista (aceito / editado / rejeitado), deve ser **registrada com timestamp**. A Clear IT precisa auditar qualquer diagnóstico que tenha influenciado uma ação em cliente crítico. |
| ⏱️ **SLA** | O Copiloto **não pode** adicionar latência ao fluxo de abertura de ticket. A sugestão deve aparecer em **até 10 segundos** após a abertura, ou ser exibida de forma assíncrona sem bloquear o analista. |

---

## 9. Critérios de Aceite

| # | Critério | Verificação |
|---|---|---|
| 1 | **Sugestão aparece dentro do ticket** | Ao abrir qualquer ticket L1 no FreshService, o Copiloto exibe em até 10s uma nota interna com diagnóstico provável (com % de confiança), ações recomendadas e rascunho de resposta — sem clique adicional. |
| 2 | **Acurácia mínima validada** | Em teste com 50 tickets históricos já resolvidos, ≥ 60% das sugestões batem com a resolução real — validado pelo time L2/L3 antes do go-live. |
| 3 | **Feedback registrado e rastreável** | O analista marca cada sugestão como "aceita", "editada" ou "rejeitada". Dado gravado com ID do ticket, ID do analista e timestamp — consultável por relatório. |
| 4 | **Sem dado sensível exposto** | Nenhum log com IP de cliente, credencial ou dado pessoal é enviado ao LLM sem mascaramento prévio. Auditoria de segurança confirma conformidade LGPD antes do deploy. |
| 5 | **MTTR mensurável após 30 dias** | Dashboard do FreshService mostra redução estatisticamente relevante no MTTR do grupo com Copiloto vs. grupo controle — delta mínimo de 15% para validar rollout. |

---

## 10. Squad

| Membro | Área |
|---|---|
| **Brenda Beatryz da Silva Oliveira** *(contato principal)* | Tecnologia e Produto |
| Eduardo Augusto Carvalho Silva Brito | Tecnologia e Produto |
| Kayk Junior Da Silva Trindade | Tecnologia e Produto |
| Raul Pereira França | Negócios e Estratégia |
| Vinícius Vieira de Souza | Negócios e Estratégia |

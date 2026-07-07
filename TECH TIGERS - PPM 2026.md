# TECH TIGERS – PPM 2026

---

## 📋 Aba 1: Squad

### Identidade e Estrutura do Squad

| Campo | Valor |
|---|---|
| **Desafio** | Desafio B – Serviços |
| **Código do Squad** | B.4 |
| **Contato Principal** | Brenda Beatryz da Silva Oliveira |
| **Nome do Squad** | Tech Tigers |

### Divisão do Squad

| Membro | Área |
|---|---|
| Brenda Beatryz da Silva Oliveira | Tecnologia e Produto |
| Eduardo Augusto Carvalho Silva Brito | Tecnologia e Produto |
| Kayk Junior Da Silva Trindade | Tecnologia e Produto |
| Raul Pereira França | Negócios e Estratégia |
| Vinícius Vieira de Souza | Negócios e Estratégia |

---

## 📋 Aba 2: Atividades Kick-Off

### Desafio

A empresa espera que nós possamos resolver a dependência humana e a lentidão na interpretação de dados técnicos complexos no primeiro nível de atendimento.

> *O que a empresa espera que a gente resolva? Foco no problema real, não nos sintomas e muito menos nas soluções.*

### Dores

| # | Dor |
|---|---|
| Dor 1 | Consultas Manuais e Fragmentados |
| Dor 2 | Curva de Aprendizado e Retrabalho |
| Dor 3 | Gargalos de Handoff e Comunicação |

> *Quais as 3 principais dores que o squad vai priorizar?*

### Impacto

Ao resolver as dores, a empresa ganha blindagem financeira e operacional: ela reduz o custo operacional (menos retrabalho e menos tempo de sênior desperdiçado) e elimina o downtime na infraestrutura do cliente.

> *Responder à pergunta: "Se resolvermos essas 3 dores, o que a empresa ganha?" (Ex: redução de custos, aumento de conversão, engajamento, retenção).*

### Indicadores (KPIs)

| Indicador | Descrição |
|---|---|
| **MTTR** | Tempo Médio de Resolução |
| **Taxa de Escalonamento / FCR** | First Contact Resolution |

> *Indicação de 1 ou 2 métricas de sucesso (KPIs) que seriam impactados/que ajudariam a mostrar o impacto da solução.*

---

## 📋 Aba 3: Lição de Casa

### Esqueleto do `business-context-lite.md`

| Etapa | Pergunta-Chave |
|---|---|
| **Dor e o Valor** *(Visão do Produto – Etapa Collect)* | Qual é a dor real do cliente e a visão geral do produto? Quem sofre com esse problema na Clear IT e como isso impacta os indicadores do negócio hoje? Isso resolve o problema certo e entrega valor? |
| **Investigação** *(Etapa Refine)* | Quais são as ambiguidades deste desafio que exigem até 3 perguntas essenciais para a Clear IT? |
| **Especificação e Regras** *(Etapa Spec)* | Qual é a história de usuário que define esta necessidade? Quais são as restrições e regras de negócio que não podemos violar? Quais são os 3 a 5 critérios de aceite claros? |

---

### 1. Dor e o Valor (Visão do Produto – Etapa Collect)

A Clear IT perdeu o controle sobre o tempo que leva para resolver incidentes porque o conhecimento técnico necessário para diagnosticá-los está disperso, não estruturado e inacessível no momento da crise. O que parece um problema de ferramentas é, na verdade, um problema de **gestão de conhecimento operacional em tempo real**: cada analista L1 começa do zero, toda vez, mesmo quando a solução já existe em algum ticket fechado ou na cabeça de um sênior.

**Visão:** Quer que o conhecimento sênior chegue automaticamente ao analista certo, no segundo em que ele mais precisa, sem depender de escalonamento ou busca manual.

---

### 2. Investigação (Etapa Refine)

**Perguntas essenciais para a Clear IT:**

1. Quais são os números reais de MTTR, FCR e volume de tickets hoje?
2. A base de conhecimento interna está estruturada e acessível, ou é informal e dispersa?
3. O que a Clear IT define como escalonamento indevido versus necessário?

---

### 3. Especificação e Regras (Etapa Spec)

#### User Story

> Como analista de suporte L1 da Clear IT, quero receber, ao abrir um ticket no FreshService, uma sugestão estruturada de diagnóstico com a causa raiz mais provável, as ações recomendadas e um rascunho de resposta ao cliente, para que eu possa resolver incidentes com autonomia — sem precisar consultar múltiplas fontes manualmente ou interromper um analista sênior — reduzindo o tempo de atendimento e aumentando minha taxa de resolução no primeiro contato.

#### Restrições e Regras de Negócio

| Regra | Descrição |
|---|---|
| **LGPD** | Dados de incidentes que contenham informações de clientes (logs, IPs, credenciais parciais) não podem ser enviados para APIs externas sem anonimização prévia. Todo dado processado pelo LLM deve ser tratado como dado sensível. |
| **Confiança** | O Copiloto nunca pode agir autonomamente sobre a infraestrutura do cliente. Toda sugestão é uma recomendação; a decisão final é sempre do analista humano. Não há execução automática de comandos. |
| **Auditoria** | Toda sugestão gerada pelo Copiloto, bem como a resposta do analista (aceito / editado / rejeitado), deve ser registrada com timestamp. A Clear IT precisa ser capaz de auditar qualquer diagnóstico que tenha influenciado uma ação em um cliente crítico. |
| **SLA** | O Copiloto não pode adicionar latência ao fluxo de abertura de ticket. A sugestão deve aparecer em até 10s após a abertura, ou ser exibida de forma assíncrona sem bloquear o analista. |

#### Critérios de Aceite

1. **Sugestão aparece dentro do ticket:** Ao abrir qualquer ticket L1 no FreshService, o Copiloto exibe em até 10 segundos uma nota interna com diagnóstico provável (com percentual de confiança), ações recomendadas e rascunho de resposta ao cliente — sem que o analista precise clicar em nenhum botão adicional.

2. **Acurácia mínima validada:** Em teste com 50 tickets históricos já resolvidos, ao menos 60% das sugestões do Copiloto batem com a resolução real registrada — validado pelo próprio time L2/L3 da Clear IT antes do go-live.

3. **Feedback registrado e rastreável:** O analista consegue marcar cada sugestão como "aceita", "editada" ou "rejeitada". Esse dado é gravado com ID do ticket, ID do analista e timestamp — consultável por relatório sem intervenção técnica.

4. **Sem dado sensível exposto:** Nenhum log contendo IP de cliente, credencial ou dado pessoal é enviado ao LLM sem mascaramento prévio. Auditoria de segurança confirma conformidade com LGPD antes do deploy em produção.

5. **MTTR mensurável após 30 dias:** Ao final do primeiro mês de uso com grupo piloto de analistas L1, o dashboard do FreshService mostra redução estatisticamente relevante no MTTR do grupo com Copiloto versus o grupo controle sem — com delta mínimo de 15% para validar continuidade do rollout.

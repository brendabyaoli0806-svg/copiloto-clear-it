# technical-context-lite.md
**Projeto:** Copiloto Inteligente para Analistas L1 – Clear IT  
**Squad:** Tech Tigers  
**Sprint:** 2 – Prova de Conceito (PoC)

---

# 1. Objetivo da PoC

## Objetivo Geral

Validar a viabilidade técnica da solução proposta para auxiliar analistas de suporte Nível 1 (L1) da Clear IT por meio de Inteligência Artificial Generativa e Recuperação de Conhecimento (RAG).

A Prova de Conceito (PoC) tem como finalidade demonstrar que as tecnologias escolhidas são capazes de:

- compreender um ticket de suporte;
- recuperar informações relevantes da base de conhecimento;
- gerar diagnósticos consistentes;
- sugerir procedimentos de resolução;
- elaborar uma resposta inicial para o cliente;
- operar dentro das restrições de segurança e LGPD.

---

# 2. Problema Validado

Durante a Sprint 1 foi identificado que a principal dificuldade enfrentada pela Clear IT está relacionada à dispersão do conhecimento técnico.

Principais impactos observados:

- elevado MTTR (Mean Time To Resolution);
- dependência excessiva de analistas especialistas;
- repetição de diagnósticos para incidentes semelhantes;
- escalonamentos desnecessários para níveis superiores;
- dificuldade de acesso ao histórico de soluções.

A PoC busca validar se a utilização de IA Generativa combinada com uma Base de Conhecimento pode reduzir esses problemas.

---

# 3. Hipóteses Validadas

A equipe definiu as seguintes hipóteses para validação.

## H1

Um modelo de linguagem consegue compreender tickets de suporte técnico.

**Resultado**

Validado.

---

## H2

A utilização de RAG reduz respostas incorretas (alucinações).

**Resultado**

Validado.

---

## H3

A busca vetorial encontra incidentes semelhantes de forma mais eficiente do que uma busca por palavras-chave.

**Resultado**

Validado.

---

## H4

É possível gerar uma sugestão de resposta ao cliente utilizando somente informações recuperadas da base documental.

**Resultado**

Validado.

---

## H5

É possível anonimizar dados antes do envio ao modelo de IA, garantindo conformidade com a LGPD.

**Resultado**

Validado conceitualmente.

---

# 4. Tecnologias Pesquisadas

| Tecnologia | Objetivo | Avaliação |
|------------|----------|-----------|
| OpenAI GPT-4o /série o | Geração de diagnóstico e respostas | Adequado |
| LangChain | Orquestração do fluxo RAG | Adequado |
| ChromaDB | Banco vetorial | Adequado |
| FastAPI | Backend | Adequado |
| React | Interface Web | Adequado |
| Docker | Containerização | Adequado |
| GitHub | Versionamento | Adequado |

---

# 5. Tecnologias Testadas

## IA Generativa

Foi testada a capacidade do modelo em:

- interpretar tickets;
- identificar possíveis causas;
- sugerir procedimentos;
- elaborar respostas ao cliente.

Resultado:

O modelo apresentou respostas coerentes para diferentes cenários de suporte.

---

## Busca Vetorial

Foi validada a recuperação de documentos semelhantes utilizando embeddings.

Resultado:

A busca retornou documentos semanticamente relacionados ao incidente informado.

---

## RAG

Foi testado um fluxo utilizando:

Documento → Busca Vetorial → LLM

Resultado:

As respostas passaram a utilizar o conteúdo recuperado da base de conhecimento, reduzindo respostas genéricas.

---

## Anonimização

Foi analisada a estratégia de remoção de dados sensíveis antes do envio ao modelo.

Resultado:

A abordagem atende às recomendações da LGPD e reduz riscos relacionados à exposição de informações pessoais.

---

# 6. Prompts Testados

## Prompt de Diagnóstico

```text
Você é um analista sênior da Clear IT.

Receba um ticket de suporte.

Analise o incidente.

Informe:

- provável causa
- nível de confiança
- ações recomendadas
- resposta ao cliente

Caso não haja informações suficientes, informe que o diagnóstico é inconclusivo.
```

---

## Prompt para RAG

```text
Utilize exclusivamente as informações presentes nos documentos fornecidos.

Nunca invente respostas.

Sempre informe a fonte utilizada.

Caso não encontre evidências suficientes, informe que não foi possível localizar documentação relacionada.
```

---

# 7. Arquitetura da Solução

```text
                 Freshservice
                      │
                      ▼
            API (FastAPI)
                      │
                      ▼
          Serviço de Anonimização
                      │
                      ▼
      Busca Vetorial (ChromaDB)
                      │
                      ▼
                LangChain
                      │
                      ▼
             OpenAI GPT-4o/Série o
                      │
                      ▼
        Diagnóstico Estruturado
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
Diagnóstico     Ações sugeridas   Resposta ao cliente
                      │
                      ▼
             Feedback do Analista
                      │
                      ▼
           Envio da Resposta Final
                para o Cliente       
                      
```

---

# 8. Escopo do MVP

## Funcionalidades Incluídas

- leitura de tickets;
- recuperação de conhecimento via RAG;
- diagnóstico provável;
- sugestão de ações;
- resposta inicial ao cliente;
- feedback do analista;
- anonimização de dados sensíveis.

---

## Fora do Escopo

- execução automática de comandos;
- acesso direto à infraestrutura;
- fechamento automático de chamados;
- treinamento contínuo do modelo;
- substituição do analista humano.

---

# 9. Critérios Técnicos

A solução deverá atender aos seguintes critérios:

- tempo máximo de resposta inferior a 10 segundos;
- conformidade com a LGPD;
- rastreabilidade das respostas;
- indicação da fonte utilizada;
- arquitetura modular;
- APIs documentadas;
- possibilidade de expansão futura.

---

# 10. Limitações da PoC

Durante a realização desta Sprint foram identificadas algumas limitações:

- utilização de dados simulados;
- ausência de acesso ao ambiente produtivo da Clear IT;
- base documental reduzida;
- necessidade de validação com tickets reais.

Essas limitações não comprometem a viabilidade da solução, mas deverão ser consideradas durante o desenvolvimento do MVP.

---

# 11. Resultado da PoC

A Prova de Conceito demonstrou que a arquitetura proposta é tecnicamente viável.

Os testes realizados indicam que:

- modelos de IA Generativa conseguem interpretar tickets de suporte;
- o uso de RAG melhora significativamente a qualidade das respostas;
- a busca vetorial permite recuperar incidentes semelhantes;
- a solução é compatível com os requisitos funcionais levantados durante a Sprint 1;
- a arquitetura proposta atende às expectativas para evolução ao MVP.

---

# 12. Próximos Passos

Na Sprint 3 será iniciado o desenvolvimento do MVP com foco em:

1. implementação do backend em FastAPI;
2. integração com a API do Freshservice;
3. implementação da busca vetorial utilizando ChromaDB;
4. integração do LangChain com o modelo de IA;
5. criação da interface web em React;
6. testes de integração;
7. validação junto à Clear IT.

---

# Status

**Fase:** Sprint 2 – Prova de Conceito

**Estado:** ✅ Concluído

**Próxima Etapa:** Sprint 3 – Desenvolvimento do MVP

# Knowledge Base — Copiloto IA e Arquitetura RAG

> Referência técnica para o Squad Tech Tigers · Copiloto de Suporte L1

---

## 1. O que é um Copiloto de IA?

Um **Copiloto** é um assistente inteligente que atua ao lado do usuário humano, sugerindo ações sem tomar decisões por conta própria. Diferente de um chatbot (que substitui a interação humana) ou de um agente autônomo (que executa ações sozinho), o Copiloto:

| Característica | Chatbot | Copiloto | Agente Autônomo |
|---|---|---|---|
| Quem interage com o cliente? | O bot | O humano | O agente |
| Quem toma a decisão? | O bot (script) | O humano | O agente (LLM) |
| Nível de autonomia | Baixo (regras) | Nenhum (sugere) | Alto (age) |
| Risco operacional | Médio | Baixo | Alto |

> **No contexto da Clear IT:** O Copiloto sugere diagnóstico e resposta ao analista L1, mas **nunca** responde ao cliente nem executa comandos na infraestrutura.

---

## 2. Arquitetura RAG (Retrieval-Augmented Generation)

**RAG** é o padrão arquitetural que permite ao LLM responder perguntas usando dados privados/internos da organização, sem precisar re-treinar o modelo.

### Fluxo básico

```
┌────────────────┐
│  Ticket aberto │
│  no FreshService│
└───────┬────────┘
        │
        ▼
┌────────────────┐     ┌──────────────────────┐
│   Embedding    │────▶│  Busca na base vetorial│
│   do contexto  │     │  (tickets similares,  │
│   do ticket    │     │   KB articles, runbooks)│
└────────────────┘     └──────────┬───────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │  Contexto relevante   │
                       │  (top-K documentos)   │
                       └──────────┬───────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │     Prompt + LLM      │
                       │  (contexto + pergunta)│
                       └──────────┬───────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │   Resposta gerada     │
                       │  (diagnóstico + ações │
                       │   + rascunho)         │
                       └──────────┬───────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │  Nota interna criada  │
                       │  no ticket FreshService│
                       └──────────────────────┘
```

### Componentes do RAG

| Componente | Função | Tecnologias comuns |
|---|---|---|
| **Document Loader** | Ingere documentos da KB, tickets resolvidos, runbooks | LangChain, LlamaIndex |
| **Chunker (Splitter)** | Divide documentos longos em pedaços menores para indexação | RecursiveCharacterTextSplitter |
| **Embedding Model** | Converte texto em vetores numéricos (representação semântica) | OpenAI `text-embedding-3-small`, Cohere, Sentence Transformers |
| **Vector Store** | Armazena e busca vetores por similaridade | Pinecone, Weaviate, Chroma, pgvector |
| **Retriever** | Busca os top-K documentos mais relevantes para a query | Similarity search, MMR, Hybrid search |
| **LLM** | Gera a resposta final com base no contexto recuperado | GPT-4o, Claude, Gemini, Llama |
| **Prompt Template** | Estrutura a instrução enviada ao LLM | System prompt + contexto + pergunta |

---

## 3. Fontes de Dados para o Copiloto

| Fonte | O que contém | Como ingerir |
|---|---|---|
| **Tickets resolvidos (FreshService)** | Descrição do incidente + resolução aplicada + notas internas | API FreshService → chunking → embeddings |
| **Knowledge Base (FreshService)** | Artigos de solução, procedimentos, workarounds | API `/solutions/articles` → chunking → embeddings |
| **Runbooks internos** | Procedimentos passo-a-passo por tipo de incidente | Documentos .md/.docx → parsing → embeddings |
| **Wiki / Confluence** | Documentação técnica de infraestrutura dos clientes | API Confluence ou scraping → chunking → embeddings |
| **Histórico de escalonamentos** | Padrões de quais problemas L1 não consegue resolver | FreshService API + análise |

### Estratégia de Chunking

Para tickets e artigos de KB, a estratégia recomendada é:

```
Ticket → dividir em:
  ├── Contexto: descrição + categoria + prioridade
  ├── Diagnóstico: notas internas do analista
  └── Resolução: ação final + feedback do cliente
```

Cada chunk recebe **metadata** (ID do ticket, categoria, data, cliente) para filtragem posterior.

---

## 4. Prompt Engineering para Suporte

### Prompt template sugerido

```
SISTEMA:
Você é um copiloto de suporte técnico da Clear IT.
Sua função é sugerir diagnóstico e ações para o analista L1.
NUNCA invente informações. Se não tiver certeza, diga explicitamente.
Use apenas os documentos fornecidos como contexto.
Responda SEMPRE em português brasileiro.

CONTEXTO RECUPERADO:
{documentos_relevantes}

TICKET ATUAL:
- Título: {titulo}
- Descrição: {descricao}
- Categoria: {categoria}
- Prioridade: {prioridade}
- Cliente: {cliente}

INSTRUÇÃO:
Com base no contexto acima, forneça:
1. **Diagnóstico provável** (com nível de confiança: alto/médio/baixo)
2. **Ações recomendadas** (passo a passo numerado)
3. **Rascunho de resposta ao cliente** (tom profissional e empático)
4. **Necessidade de escalonamento** (sim/não, com justificativa)
```

### Boas práticas de prompt

| Prática | Por quê |
|---|---|
| Instruir para não inventar | Evita alucinações — o LLM deve admitir incerteza |
| Incluir metadata do ticket | Permite contextualizar a resposta (prioridade, cliente) |
| Pedir nível de confiança | O analista sabe quando confiar mais ou menos na sugestão |
| Separar diagnóstico de resposta | O analista pode usar um sem o outro |
| Tom profissional e empático | A resposta ao cliente deve manter o padrão da Clear IT |

---

## 5. Avaliação de Qualidade (Evals)

### Como medir se o Copiloto está funcionando

| Método | O que mede | Como fazer |
|---|---|---|
| **Teste com tickets históricos** | Acurácia da sugestão vs. resolução real | Rodar 50 tickets resolvidos pelo Copiloto e comparar com a resolução do analista |
| **Feedback do analista** | Utilidade percebida | Botões "aceita / editada / rejeitada" em cada sugestão |
| **A/B Test (grupo piloto)** | Impacto real em MTTR e FCR | Grupo com Copiloto vs. grupo sem, durante 30 dias |
| **Revisão L2/L3** | Qualidade técnica | Seniores revisam amostra de sugestões para validar precisão |

### Critérios de acurácia

| Nível | Definição |
|---|---|
| ✅ **Match exato** | Sugestão bate com a resolução real (mesma ação) |
| 🟡 **Match parcial** | Sugestão está na direção certa mas incompleta |
| ❌ **Miss** | Sugestão errada ou irrelevante |
| ⚠️ **Alucinação** | Sugestão inventa informação que não existe no contexto |

> **Meta do projeto:** ≥ 60% de match (exato + parcial) nos 50 tickets de teste.

---

## 6. Padrão de Integração com FreshService

### Arquitetura simplificada

```
FreshService                    Backend do Copiloto
┌──────────────┐               ┌──────────────────┐
│              │  Webhook      │                  │
│  Novo ticket │──────────────▶│  1. Recebe evento│
│  criado      │               │  2. Extrai dados │
│              │               │  3. Busca RAG    │
│              │  POST /notes  │  4. Gera sugestão│
│  Nota interna│◀──────────────│  5. Envia nota   │
│  exibida     │               │                  │
└──────────────┘               └──────────────────┘
```

### Requisitos técnicos

| Requisito | Especificação |
|---|---|
| **Latência** | Sugestão em ≤ 10 segundos (ou assíncrona sem bloquear) |
| **Autenticação** | API Key do FreshService com permissão de leitura de tickets e escrita de notas |
| **Webhook** | Configurar Automation Rule no FreshService para disparar webhook on ticket creation |
| **Fallback** | Se o backend falhar, o ticket segue normalmente sem sugestão (graceful degradation) |

---

## 7. Stack Tecnológica Sugerida

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Backend API** | Python (FastAPI) | Ecossistema maduro para IA, assíncrono, performance |
| **Orquestração LLM** | LangChain / LlamaIndex | Abstrações prontas para RAG, prompts, chains |
| **Embedding** | OpenAI `text-embedding-3-small` | Custo baixo, qualidade alta, fácil integração |
| **Vector Store** | Chroma (dev) / pgvector (prod) | Chroma para prototipação rápida, pgvector para produção |
| **LLM** | GPT-4o-mini / GPT-4o | Bom equilíbrio custo × qualidade para geração |
| **Mascaramento LGPD** | Presidio (Microsoft) ou regex custom | Open source, detecta PII em português |
| **Observabilidade** | LangSmith / Langfuse | Rastreamento de prompts, latência, qualidade |
| **Deploy** | Docker + Railway / Render | Simples, sem gerenciar servidor |

---

## 8. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| **Alucinação do LLM** | Sugestão errada pode levar a ação incorreta | Sempre exibir nível de confiança + instruir que é sugestão, não ordem |
| **Base de conhecimento pobre** | Sem dados bons, não há RAG útil | Validar qualidade e volume da KB antes de começar |
| **Latência alta** | Sugestão chega tarde demais | Usar modelo leve (GPT-4o-mini), cache de embeddings, processamento assíncrono |
| **Vazamento de dados (LGPD)** | Dados pessoais enviados ao LLM | Mascaramento com Presidio antes de qualquer chamada à API |
| **Rejeição pelo analista** | Ferramenta ignorada se não for útil | Envolver L1 no design, medir feedback, iterar rápido |

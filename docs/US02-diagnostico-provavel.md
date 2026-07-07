# US02: Diagnóstico Provável com % de Confiança

## 1. Descrição da User Story
**Como** analista de suporte L1 da Clear IT,  
**Quero** receber a provável causa raiz de um incidente acompanhada de um indicador (percentual) de confiança,  
**Para que** eu possa avaliar a precisão da sugestão do Copiloto, medir o risco da ação e tomar uma decisão rápida sem precisar escalar o ticket de imediato.

## 2. Regras de Negócio e Lógica de Confiança
A geração do percentual de confiança não pode ser apenas uma "alucinação" randômica do modelo. Ela deve derivar de duas fontes combinadas na nossa arquitetura RAG:
1. **Similaridade Vetorial (ChromaDB):** O score de similaridade (*cosine distance* ou similar) dos documentos/tickets encontrados no banco. Se não há contexto similar, a confiança cai drasticamente.
2. **Auto-avaliação do Modelo (LLM):** O prompt orientará o LLM a julgar o quanto os "Sintomas do Ticket" batem perfeitamente com a "Resolução do Documento Recuperado".

**Padrão Sugerido de Classificação:**
- 🔴 **Baixa (< 50%):** O diagnóstico foi inconclusivo ou os documentos base não tinham relação direta. Exige revisão manual ou escalonamento (L2).
- 🟡 **Média (50% a 79%):** Os sintomas batem parcialmente com o histórico. O analista deve analisar com cuidado antes de enviar a resposta.
- 🟢 **Alta (≥ 80%):** Alta correspondência (sintomas idênticos a tickets resolvidos anteriormente). Ação recomendada é considerada segura.

## 3. Critérios de Aceite
1. **Garantia de Estrutura:** Todo diagnóstico retornado pelo sistema deve conter o campo numérico (ou string validada) de `% de confiança`.
2. **Prevenção de Alucinação:** Se o ChromaDB não retornar documentos acima do limiar mínimo de similaridade (*threshold*), o sistema deve automaticamente barrar o LLM e retornar: "Confiança: Baixa" e "Causa Raiz: Necessária investigação manual".
3. **Instruções Rígidas (Grounding):** O LLM é instruído a relatar confiança próxima a zero caso tente deduzir um erro com base em seus dados pré-treinados em vez da base de conhecimento da Clear IT.

## 4. Engenharia de Prompt (Proposta de Implementação via LangChain)

```text
Você é o Copiloto de suporte Nível 1 da Clear IT.
Analise os SINTOMAS relatados no ticket abaixo e compare-os EXCLUSIVAMENTE com os DOCUMENTOS DE CONTEXTO recuperados da nossa base.

SINTOMAS DO CLIENTE:
{ticket_description}

DOCUMENTOS DE CONTEXTO (Histórico Clear IT):
{context_documents}

INSTRUÇÕES:
1. Identifique a Causa Raiz mais provável.
2. Atribua um percentual de confiança (0 a 100).
   - Dê notas > 80% APENAS se a resolução documentada for perfeitamente aplicável aos sintomas.
   - Dê notas < 50% se os documentos tiverem apenas palavras parecidas, mas não descreverem exatamente a falha.
3. Se os Documentos de Contexto forem vazios ou inúteis para o caso, retorne Causa Raiz como "Inconclusivo" e Confiança como 0.
Nunca invente soluções que não estejam no contexto.
```

## 5. Tarefas Técnicas de Implementação (Backend)
- [ ] Implementar captura do *Distance Score* no LangChain ao fazer o retriever do ChromaDB.
- [ ] Configurar um *Output Parser* (usando Pydantic) para obrigar a OpenAI/LLM a devolver sempre o payload em formato JSON validado `{"causa_raiz": string, "confianca_percentual": integer}`.
- [ ] Criar lógica de *Fallback* no FastAPI: se a busca vetorial falhar ou tiver similaridade muito fraca, bypassar o LLM e retornar erro/inconclusivo para economizar tokens.
- [ ] Validar testes unitários com "Ticket Fora de Escopo" vs "Ticket Idêntico ao Histórico" para aferir se as taxas de confiança mudam adequadamente.

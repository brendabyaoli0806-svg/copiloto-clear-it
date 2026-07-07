# US03: Rascunho de Resposta ao Cliente

## 1. Descrição da User Story
**Como** analista de suporte L1 da Clear IT,  
**Quero** receber um rascunho de e-mail ou mensagem formulado com base no diagnóstico e nas ações recomendadas,  
**Para que** eu possa me comunicar rapidamente com o usuário final sem precisar redigir mensagens do zero, mantendo o padrão de qualidade e reduzindo significativamente o meu tempo de atendimento (MTTR).

## 2. Regras de Negócio e Tom de Voz
1. **Tom de Voz (Tone of Voice):** A comunicação deve ser empática, clara, profissional e em **Português do Brasil (PT-BR)**.
2. **Clareza para o Usuário Final:** A resposta não deve conter jargões técnicos densos (a menos que seja indispensável). O foco é informar o status ou guiar o usuário de forma simples.
3. **Limites de Afirmação (Prevenção de Falsos Positivos):** 
   - A IA **nunca** deve redigir uma mensagem afirmando que uma ação técnica no backend ou infraestrutura *já foi executada* (pois o Copiloto apenas sugere, quem age é o analista).
   - Se a resolução depender do usuário (Ex: limpar cache, resetar senha no portal), a resposta deve trazer o passo a passo.
   - Se a resolução depender da TI, a resposta deve ser no sentido de: *"Identificamos a possível causa e nossa equipe técnica está atuando..."*
4. **Placeholders Seguros:** Por conta da LGPD (dados anonimizados no envio ao LLM), a IA deve usar marcadores genéricos como `[Nome do Cliente]`, que o analista (ou o front-end via FreshService) preencherá facilmente antes do envio real.
5. **Variação por Nível de Confiança (Vínculo com a US02):**
   - **Confiança Alta:** Rascunho com instruções diretas de contorno (*workaround*).
   - **Confiança Baixa:** Rascunho de contingência, informando apenas que o ticket foi escalado/está sob análise profunda.

## 3. Critérios de Aceite
1. **Estrutura de Retorno:** O payload JSON gerado pela API deve sempre conter o campo `rascunho_resposta` em formato texto/string.
2. **Aderência ao Tom:** Revisão com amostra de 20 tickets garantindo que a linguagem soa natural e respeitosa.
3. **Segurança de Ação:** 0% de respostas geradas onde a IA "simula" ter consertado algo sem intervenção humana.
4. **Condicional de Baixa Confiança:** Teste unitário confirmando que, quando o banco vetorial não fornece contexto, a IA gera a resposta padrão de "ticket em análise".

## 4. Engenharia de Prompt (Proposta de Implementação)

```text
Como parte da sua análise, redija um "rascunho_resposta" para o cliente final.

DIRETRIZES DE COMUNICAÇÃO:
1. Idioma: Português do Brasil (PT-BR). Tom: Empático, polido e profissional.
2. Inicie com "Olá, [Nome do Cliente]," e encerre com "Atenciosamente, Equipe Clear IT."
3. DEPENDE DA SUA CONFIANÇA:
   - Se sua CONFIANÇA for ALTA (tem base nos documentos): Explique de forma simples (sem jargões profundos) o que ocorreu e forneça um passo a passo do que o cliente deve fazer (workaround).
   - Se a ação depender da equipe de TI e não do cliente, informe apenas que "nossa equipe técnica identificou a causa e está atuando para normalizar o serviço".
   - Se sua CONFIANÇA for BAIXA (sem documentos relevantes): Apenas redija: "Olá, [Nome do Cliente], recebemos sua solicitação. Como se trata de um cenário específico, nosso time avançado já está analisando o caso em detalhes e retornaremos em breve. Atenciosamente, Equipe Clear IT."
4. NUNCA afirme que você ou a equipe "já reiniciou" ou "já consertou" a infraestrutura. O rascunho é enviado ANTES do analista executar a ação.
```

## 5. Tarefas Técnicas de Implementação (Backend)
- [ ] Atualizar o esquema do Pydantic (Output Parser) para incluir `rascunho_resposta: str`.
- [ ] Incluir as regras condicionais de comunicação no bloco final do *System Prompt* do LangChain.
- [ ] Criar um mecanismo de substituição básica (Regex) no lado da API caso o FreshService já entregue o nome do cliente de forma isolada, substituindo o `[Nome do Cliente]` automaticamente para poupar o tempo do analista.

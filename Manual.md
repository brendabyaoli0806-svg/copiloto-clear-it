# Manual do Sistema — Copiloto IA de Suporte Clear IT

## 1. Descrição do Sistema
O **Copiloto IA de Suporte Clear IT** é uma plataforma desenvolvida para auxiliar analistas de suporte técnico na análise e resolução de chamados (tickets). 

O sistema utiliza Inteligência Artificial com a técnica **RAG (Retrieval-Augmented Generation)** para consultar uma base de conhecimento e tickets históricos, gerando sugestões de diagnóstico e resolução. 

Seu objetivo é reduzir o tempo de atendimento, padronizar as respostas e aumentar a produtividade da equipe de suporte. O sistema atua como um copiloto, oferecendo recomendações ao analista, sem substituir sua decisão.

---

## 2. Fluxo de Funcionamento
1. **Usuário:** Preenche o ticket de suporte no *Frontend Web*.
2. **API FastAPI:** Recebe e processa o ticket.
3. **Geração de Embeddings & Busca Vetorial (ChromaDB):** Consulta a base de conhecimento e tickets históricos.
4. **Construção do Contexto (RAG):** Envia as informações estruturadas para o modelo de IA.
5. **Modelo de IA (Groq + Llama 3.3):** Gera o diagnóstico preciso do problema.
6. **Resposta ao Frontend:** Exibe as recomendações e rascunhos de resposta diretamente para o analista na tela.

---

## 3. Principais Funcionalidades
* Recebimento de tickets de suporte.
* Análise inteligente utilizando IA.
* Consulta automática à base de conhecimento.
* Pesquisa de tickets semelhantes por meio de RAG.
* Identificação da provável causa do problema.
* Classificação da criticidade do incidente.
* Sugestão de ações para resolução.
* Geração de resposta sugerida ao usuário.
* Exibição do nível de confiança da análise.
* API REST desenvolvida em FastAPI.

---

## 4. Tecnologias Utilizadas
* **Backend:** Python, FastAPI, Pydantic, ChromaDB, Embeddings, Groq API (Modelo Llama 3.3).
* **Frontend:** React, TypeScript, Tailwind CSS, Lovable.

---

## 5. O que Ainda Não Está Funcionando
* Integração completa com a base oficial da Clear IT.
* Alimentação automática da base de conhecimento.
* Aprendizado contínuo a partir dos novos tickets resolvidos.
* Autenticação e controle de usuários.
* Dashboard com indicadores e métricas.
* Histórico detalhado das análises realizadas.
* Integração direta com plataformas de Service Desk (Freshservice).
* Ajustes de desempenho e otimização do tempo de resposta.

---

## 6. Próximos Passos e Evoluções
* Implementar autenticação e controle de acesso por perfis.
* Criar um painel administrativo com métricas e indicadores.
* Permite feedback do analista para melhorar os diagnósticos.
* Atualizar automaticamente a base de conhecimento.
* Integrar com sistemas reais de gerenciamento de tickets.
* Suportar anexos como imagens, PDFs e arquivos de log.
* Disponibilizar notificações em tempo real.
* Melhorar a explicabilidade da IA, mostrando as evidências utilizadas.
* Expandir o suporte para múltiplos idiomas.

---

## 7. Equipe (Squad Tech Tigers)
* **Brenda Beatryz da Silva Oliveira**
* **Eduardo Augusto Carvalho Silva Brito**
* **Kayk Junior da Silva Trindade**
* **Raul Pereira França**
* **Vinícius Vieira de Souza**

---

## 8. Conclusão
O Copiloto IA de Suporte Clear IT demonstra como a Inteligência Artificial pode apoiar equipes de suporte técnico na tomada de decisão. Ao combinar RAG, busca vetorial e modelos de linguagem, o sistema fornece diagnósticos rápidos e contextualizados, contribuindo para a redução do tempo de resolução dos chamados e para a melhoria da qualidade do atendimento. Embora algumas funcionalidades ainda estejam em desenvolvimento, a arquitetura foi projetada para permitir futuras integrações e evoluções do projeto.

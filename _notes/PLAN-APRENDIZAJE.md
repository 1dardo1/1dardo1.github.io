# Plan de aprendizaje: ingeniero / arquitecto de IA

Notas personales. Esta carpeta empieza por `_`, así que GitHub Pages (Jekyll) no la
publica en la web; sigue siendo legible en el repositorio de GitHub.

Estado verificado el 2026-11-26 leyendo los repositorios. Si pasa tiempo, vuelve a
comprobar el estado antes de fiarte de la tabla de abajo.

---

## 1. Dónde estás hoy

| Repositorio | Visibilidad | Estado real |
|---|---|---|
| `devtools-rag-ingestion` | público | Hexagonal, outbox transaccional sobre PostgreSQL, API FastAPI, Dockerfile, compose, migraciones Alembic, CI, despliegue público (Render + Neon), 27 ADRs, 270+ tests, cobertura mínima del 99 %. **Falta el relay a Redis (4.3).** |
| `devtools-rag-contracts` | público | Esquema `DocumentIngested`, política de versionado (ADR 0008), workflows de CI y release. **Fase 3 sin cerrar:** 7 preguntas de diseño y 2 huecos de contrato sin resolver; falta el tag `v0.2.0`. |
| `devtools-rag-retrieval` | privado | Sólo README y LICENSE. Todo por hacer. |
| `lcp-builder` | público | Flutter, Clean/Hexagonal, 380+ tests, CI, vault de ADRs. Ya está en el CV. |
| `DnD_helper` | público | Angular 21 (signals), PWA + APK con Capacitor, motor de reglas, scraper en Python, 6 workflows. Añadido al CV. |
| `ASEGURA2` | privado | Juego de mesa Angular + Express, un solo commit, sin README. Poco valor para el perfil. |
| `AgostoOneShot` | privado | Vault de Obsidian de una partida de rol. Sin valor para el perfil. |

### Lo que ya demuestras y lo que no

| Habilidad | Estado |
|---|---|
| Arquitectura hexagonal, ADRs, decisiones documentadas | Demostrado (ingesta, contratos, lcp-builder) |
| Docker, compose | Demostrado (ingesta) |
| CI/CD y DevOps (GitHub Actions, Azure DevOps) | Demostrado |
| Despliegue público | Demostrado (Render + Neon) |
| Patrón outbox / eventos | Medio: la mitad escrita, falta el relay |
| RAG, búsqueda híbrida, Qdrant | Sin empezar |
| Evaluación (Ragas, trazas) | Sin empezar |
| Orquestación de agentes | No está en el plan del sistema: hay que añadirlo |
| AWS | No está en el plan: añadir como adaptador |
| Kubernetes | No está en el plan: añadir después de la puerta |

### Dos huecos de diseño (material de entrevista)

Documentados en `devtools-rag-contracts/docs/EVENT-INVENTORY.md`:

1. **El consumidor no puede leer el contenido.** `DocumentIngested` no lleva los bytes y
   ningún endpoint los devuelve.
2. **Nadie informa de vuelta.** El estado `pending → indexed | failed` sólo llega a
   `pending`, porque no hay evento en sentido inverso.

---

## 2. Plan de 13 semanas (unas 10 h/semana)

El orden sale del bloqueo real: contratos → relay → indexación → recuperación.

| Semanas | Trabajo | Qué demuestra |
|---|---|---|
| 1–2 | **Contratos (Fase 3).** Responder las 7 preguntas como ADRs nuevos; decidir los huecos 4.1 y 4.2; publicar `v0.2.0`. | Diseño de contratos, versionado, compatibilidad |
| 3 | **Relay y Redis (4.3).** Comando `--once` (ADR 0027), Redis en Upstash, completar compose (5.2). | Outbox de punta a punta |
| 4–5 | **Dominio de recuperación (Fase 8).** `Chunk`, `IndexedDocument`, `Query`; puertos `Chunker`, `EmbeddingProvider`, `VectorStore`, `LLMClient`; casos de uso `IndexDocument` y `AnswerQuery` con dobles. | Hexagonal aplicada a RAG |
| 6–7 | **Infraestructura de recuperación (Fase 9).** Consumidor de Redis Streams idempotente, Qdrant con búsqueda híbrida, adaptadores de embeddings y LLM, endpoint de consulta. | RAG real, consumo idempotente |
| 8 | **Contenedores y calidad (Fase 10).** Compose con app y Qdrant, tests de integración, Sentry. | Operación |
| 9–10 | **Evaluación y agentes (Fase 11 + extensión).** Dataset fijo con casos sensibles a la versión, Ragas, trazas con LangSmith o Phoenix. **Extensión:** convertir `AnswerQuery` en un agente con herramientas y comparar agente frente a RAG simple con las mismas métricas. | Evaluación y orquestación de agentes |
| 11 | **Despliegue de recuperación (Fase 12, puerta).** Público, CI, README en inglés. | Flujo completo subir → indexar → responder |
| 12 | **AWS y Kubernetes (ampliaciones).** Adaptador de `LLMClient` o `EmbeddingProvider` sobre Amazon Bedrock; manifiestos para `kind` con el relay como `CronJob`. | Cloud sin tocar el dominio; Kubernetes con justificación técnica |
| 13 | **Seguridad (Fase 13).** Límites de tasa, validación, mitigación de inyección de prompts, auditoría de secretos; cada decisión como ADR. | Seguridad en sistemas con LLM |

Habilidades transversales (datos, arquitectura, comunicación) se trabajan dentro de las
fases anteriores, no como bloque aparte.

---

## 3. Dónde aprender cada cosa

Los enlaces son de webs oficiales o plataformas conocidas; si alguno ha cambiado,
búscalo por el nombre.

**Contenedores y DevOps**
- Docker: https://docs.docker.com/get-started/ · práctica en https://labs.play-with-docker.com/
- GitHub Actions: https://docs.github.com/en/actions · https://skills.github.com/
- Azure DevOps Pipelines: https://learn.microsoft.com/azure/devops/pipelines/

**LLMs, RAG y agentes**
- Cursos cortos gratuitos: https://www.deeplearning.ai/short-courses/
- Documentación de Claude (tool use, salidas estructuradas): https://docs.claude.com/
- Qdrant: https://qdrant.tech/documentation/
- LangGraph: https://langchain-ai.github.io/langgraph/ · CrewAI: https://docs.crewai.com/

**Evaluación y observabilidad**
- Ragas: https://docs.ragas.io/ · promptfoo: https://www.promptfoo.dev/docs/intro/ · DeepEval: https://deepeval.com/docs/getting-started
- Trazas: https://langfuse.com/docs · https://opentelemetry.io/docs/ · https://docs.smith.langchain.com/

**Cloud y Kubernetes**
- AWS Skill Builder (gratuito): https://skillbuilder.aws/ · Bedrock: https://aws.amazon.com/bedrock/
- Kubernetes: https://kubernetes.io/docs/tutorials/kubernetes-basics/ · https://kind.sigs.k8s.io/ · https://killercoda.com/
- Terraform: https://developer.hashicorp.com/terraform/tutorials

**Arquitectura, seguridad y regulación**
- ADRs: https://adr.github.io/ · modelo C4: https://c4model.com/
- OWASP Top 10 for LLM: https://genai.owasp.org/
- EU AI Act: https://artificialintelligenceact.eu/
- Libros: *Designing Data-Intensive Applications* (Kleppmann); *Fundamentos de arquitectura de software* (Richards y Ford)

**Datos y ML**
- SQL interactivo: https://sqlbolt.org/
- Machine Learning (Andrew Ng): https://www.coursera.org/specializations/machine-learning-introduction
- ML Crash Course de Google: https://developers.google.com/machine-learning/crash-course

---

## 4. Cómo demostrarlo

### Certificado o proyecto
Proyectos primero, con uno o dos certificados como apoyo.

- Un certificado pasa filtros de CV, pero no prueba que sepas aplicarlo.
- Un repositorio con README claro, métricas y decisiones documentadas es lo que se revisa en la
  entrevista técnica.
- Certificados que merecen la pena: AWS Solutions Architect – Associate, CKAD o CKA, y
  Microsoft AI-102 si la empresa usa Azure.

### Un proyecto grande o varios pequeños
Las dos cosas, con funciones distintas:

1. **El sistema insignia** (ingesta + contratos + recuperación) demuestra integración y criterio de
   arquitectura. Es lo primero que enseñas.
2. **Dos o tres piezas pequeñas y enfocadas** demuestran profundidad en una sola herramienta
   (por ejemplo, los manifiestos de Kubernetes con su README de decisiones, o la suite de
   evaluación con métricas comparadas entre versiones). Responden a las preguntas del tipo
   "¿cómo harías X?".

Sólo proyectos grandes: parece que no dominas nada en concreto. Sólo pequeños: parece que no sabes
integrar.

### Reglas para cualquier repositorio
- README con un problema, una decisión y un resultado medido.
- Un diagrama de arquitectura (C4 o similar).
- Un ADR por cada decisión importante.
- Números reales, aunque sean pequeños ("acierto del 62 % → 81 % con reranking").
- Un apartado de "qué haría distinto": es la pregunta casi segura en entrevista.

### Dónde mirar un reclutador
1. **CV / portfolio** (`1dardo1.github.io`): ya incluye el sistema RAG y D&D Helper.
2. **GitHub:** fijar los repositorios de ingesta, contratos y lcp-builder.
3. **LinkedIn:** vídeo de demo de 2 minutos y enlace al repositorio en "Destacados".
4. **Entrevista:** contar un hueco de diseño que encontraste y cómo lo resolviste.

### Cómo contarlo en 60 segundos (plantilla)
> "Hice un sistema RAG sobre documentación técnica, dividido en dos servicios. El de ingesta guarda
> el documento y su evento en una sola transacción para no perder nunca un evento. Al diseñar el
> contrato entre servicios encontré que el consumidor no podía leer el contenido, y lo documenté
> antes de construirlo. Medí la calidad con un dataset fijo y lo ejecuto en el pipeline antes de
> cada despliegue. Si lo hiciera otra vez, separaría la evaluación en un servicio propio."

(Adáptala cuando el relay, la recuperación y la evaluación existan de verdad: hoy sólo está
construida la parte de ingesta.)

---

## 5. Pendientes que sólo puedes hacer tú

- Actualizar el README de perfil (`1dardo1/1dardo1`): sigue diciendo "Docker: aprendiendo" y sólo
  destaca LCP Builder.
- Fijar los repositorios en tu perfil de GitHub.
- Decidir si el plan vive en el repositorio de ingesta, en otro privado o sólo aquí.
- Cuando existan el relay y la recuperación, revisar el CV para no quedarse corto ni pasarse.

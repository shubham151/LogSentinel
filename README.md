# LogSentinel

**Conversational AI for Server Log Analysis**

---

## Inspiration

Modern web applications produce millions of logs daily — yet developers still rely on manual grepping and filtering to find issues. **LogSentinel** was born out of the need to make logs conversational. Ask it anything in plain English, and get real-time, structured answers, backed by your actual server logs.

---

## What It Does

**LogSentinel** is an AI-powered log analytics agent that:

- Ingests server access logs into **MongoDB**.
- Indexes them using **vector search** for semantic understanding.
- Lets users ask questions like:
  - “Show all 500 errors from the last 30 minutes”
  - “Which IPs made the most POST requests today?”
- Returns structured and actionable results via a responsive web interface.

---

## How We Built It

- **MongoDB Atlas** – Stores structured logs using CSV imports, supports full-text and vector indexing.
- **LangChain** – Powers the RAG (retrieval-augmented generation) pipeline for natural language queries.
- **Google Gemini API** – Interprets natural language input and generates accurate responses.
- **Next.js** – Frontend for a fast, reactive, and user-friendly interface.
- **LangChain tools** – Connect user prompts to dynamic MongoDB queries and visualize the results.

---

## Challenges

- Converting unstructured logs into a queryable schema.
- Creating fallback mechanisms for vague or malformed queries.
- Translating natural language into precise MongoDB queries.
- Designing an intuitive UI that bridges both chat and real-time metrics.

---

## Accomplishments

- End-to-end natural language interface for real-time log analysis.
- Responsive dashboard with live metrics and visual feedback.
- Smart agent that handles ambiguity and can ask for clarification.
- Unified view combining chatbot interaction with structured insights.

---

## What We Learned

- Building hybrid systems using **RAG + structured DB querying**.
- Deep integration of **LangChain** with **MongoDB**.
- Real-time analytics best practices in **Next.js**.
- How to manage ambiguity, intent recognition, and fallback flows in language agents.

---

## What’s Next

- Add user authentication and scoped log access.
- Enable filtering and querying of structured (JSON) logs via natural language.
- Export insights to **Slack** or **email alerts**.
- Integrate anomaly detection for proactive monitoring.
- Expand log support: application logs, DB logs, and more.
- Build an interactive response UI for deeper insights.

---

## Dataset Used

We used a cleaned and structured version of the **Web Server Access Logs Dataset** from [Kaggle](https://www.kaggle.com/). The logs include:

| Column     | Description                             |
|------------|-----------------------------------------|
| `timestamp`| Date and time of the request (Apache format) |
| `ip`       | Client IP address                       |
| `method`   | HTTP method (e.g., GET, POST)           |
| `url`      | Requested URL path                      |
| `status`   | HTTP status code                        |
| `size`     | Response size in bytes                  |

---

## Try Asking

- `"Show all 404s from the past hour"`
- `"Which IP made the most GET requests yesterday?"`
- `"List top 10 endpoints by request volume"`

---

## Tech Stack

- **MongoDB Atlas**
- **LangChain**
- **Google Gemini**
- **Next.js**
- **CSV / Log Parsing**
- **Vector Search / Full-Text Search**


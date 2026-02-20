import React, { useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardActions,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
} from "@mui/material";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MemoryIcon from "@mui/icons-material/Memory";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";

/**
 * CENTRAL DATA SOURCE
 * - Keep the same look/feel as your landing Features list
 * - Each feature gets: icon, title, subtitle, description, badges, sections, steps, integrations, faqs, cta
 * - slug must match your landing "link" path (without leading slash)
 */
const FEATURE_DETAILS = {
  "ai-assistance": {
    icon: <AutoAwesomeIcon sx={{ fontSize: 36, color: "#61dafb" }} />,
    title: "AI Assistance",
    subtitle: "Context-Aware Help for Every Developer Task",
    description:
      "Plug in DB schemas, API specs, and repositories to get precise, context-aware generation, debugging, refactors, tests, and optimizations.",
    badges: [
      "Code Generation",
      "Debugging",
      "Refactoring",
      "Unit/Integration Tests",
      "Migrations",
      "Perf Optimization",
      "Full App Scaffolds",
    ],
    heroImage: null, // optional image path
    highlights: [
      "Understands your stack via schema + repo context",
      "Explains diffs and suggests safer refactors",
      "Generates tests with coverage hints",
      "Works with monorepos & microservices",
    ],
    sections: [
      {
        heading: "What it solves",
        points: [
          "Slow onboarding due to scattered docs and tribal knowledge.",
          "Manual refactors that risk regressions and missed edge cases.",
          "Time-consuming code reviews and missing test coverage.",
        ],
      },
      {
        heading: "Why it’s better",
        points: [
          "Grounded in your real code + data contracts (less hallucination).",
          "Produces runnable snippets and PR-friendly patches.",
          "Guides you with reasoning + quick-fix suggestions.",
        ],
      },
    ],
    steps: [
      {
        title: "Connect Context",
        detail:
          "Link GitHub/GitLab repos, DB schemas, and API specs. The assistant indexes key contracts and dependency graphs.",
      },
      {
        title: "Ask or Generate",
        detail:
          "Describe features, fixes, or tests. The assistant proposes code with inline explanations and commands.",
      },
      {
        title: "Review & Apply",
        detail:
          "Receive patch-style output ready for PRs. Iterate with follow-ups, then ship.",
      },
    ],
    integrations: [
      "GitHub",
      "GitLab",
      "Bitbucket",
      "OpenAPI/Swagger",
      "Postman Collections",
      "SQL/NoSQL Schemas",
    ],
    faqs: [
      {
        q: "How does it avoid breaking changes?",
        a: "It reads your types, interfaces, tests, and dependency graph to keep signatures and contracts consistent.",
      },
      {
        q: "Can it generate tests from existing code?",
        a: "Yes — unit and integration tests with assertions, fixtures, and coverage guidance.",
      },
      {
        q: "Does it work with monorepos?",
        a: "Absolutely. It maps packages, shared libs, and version constraints before proposing changes.",
      },
    ],
    cta: {
      label: "Start with AI Assistance",
      to: "/register",
    },
  },

  "ai-bots": {
    icon: <MemoryIcon sx={{ fontSize: 36, color: "#c084fc" }} />,
    title: "AI Bots",
    subtitle: "Spin Up Specialized Agents in Minutes",
    description:
      "Create channel-ready AI agents for Slack/Discord or internal tools. Let them answer, triage, summarize, and act.",
    badges: ["Slack", "Discord", "Inter-Bot Chats", "Triage", "Summaries", "Actions"],
    heroImage: "ai-bots.jpg",
    highlights: [
      "Fine-tune behavior with guardrails and tools",
      "Enable agent-to-agent collaboration",
      "Route to humans with context summaries",
    ],
    sections: [
      {
        heading: "Use cases",
        points: [
          "On-call triage and incident first response.",
          "Product Q&A and customer support deflection.",
          "Daily summaries across repos and tickets.",
        ],
      },
      {
        heading: "Governance",
        points: [
          "Role-based permissions and audit logs.",
          "Tool access policies per channel/workspace.",
        ],
      },
    ],
    steps: [
      { title: "Define Persona", detail: "Pick tone, scope, and allowed actions." },
      { title: "Connect Tools", detail: "Wire up Slack/Discord, docs, issue trackers, and webhooks." },
      { title: "Deploy", detail: "Invite bot to channels; monitor usage and quality." },
    ],
    integrations: ["Slack", "Discord", "Confluence", "Jira", "Linear", "GitHub"],
    faqs: [
      { q: "Can multiple bots talk to each other?", a: "Yes. Orchestrate inter-bot handoffs for complex workflows." },
      { q: "How are actions restricted?", a: "Per-bot tool policies and RBAC prevent unauthorized operations." },
    ],
    cta: { label: "Create Your First Bot", to: "/register" },
  },

  "ai-documentation": {
    icon: <DescriptionIcon sx={{ fontSize: 36, color: "#4ade80" }} />,
    title: "AI-Powered Documentation",
    subtitle: "Continuous Docs for Codebases & Databases",
    description:
      "Generate, update, and answer questions about your code and data models. Ideal for onboarding and cross-team clarity.",
    badges: ["Code Docs", "DB Docs", "Onboarding", "Explainers", "Diagrams"],
    heroImage: "ai-database.jpg",
    highlights: [
      "Keeps docs fresh with commit hooks",
      "ERD and sequence diagram generation",
      "In-doc chat for clarification",
    ],
    sections: [
      {
        heading: "Outputs",
        points: [
          "Module-level docs with examples and gotchas.",
          "API tables, parameter notes, and error semantics.",
          "DB entity docs with relationships and constraints.",
        ],
      },
      {
        heading: "Quality",
        points: [
          "Pulls from comments, types, and tests to reduce guesswork.",
          "Flags undocumented public functions for follow-up.",
        ],
      },
    ],
    steps: [
      { title: "Connect Repos/DB", detail: "Index symbols, routes, and schemas." },
      { title: "Generate & Review", detail: "Proposed docs appear as drafts or PRs." },
      { title: "Publish & Chat", detail: "Host docs with search and an embedded Q&A assistant." },
    ],
    integrations: ["GitHub", "GitLab", "OpenAPI", "PlantUML/Mermaid", "PostgreSQL", "MongoDB"],
    faqs: [
      { q: "Will it add diagrams?", a: "Yes — ERD, sequence, and flow diagrams can be generated from code and schema context." },
      { q: "How does it stay updated?", a: "Use CI hooks to refresh on every merge to main." },
    ],
    cta: { label: "Generate Docs", to: "/register" },
  },

  "ai-database": {
    icon: <StorageIcon sx={{ fontSize: 36, color: "#60a5fa" }} />,
    title: "AI for Database",
    subtitle: "Visualize, Model, and Query with AI",
    description:
      "Connect SQL or NoSQL, visualize ER diagrams, generate queries, and craft high-quality mock data automatically.",
    badges: ["ER Diagrams", "Query Gen", "Mock Data", "Modeling"],
    heroImage: "database.png",
    highlights: [
      "Reverse-engineer schemas into diagrams",
      "AI query generation with explanations",
      "Seed sandbox environments with mock data",
    ],
    sections: [
      {
        heading: "Capabilities",
        points: [
          "Model DB with AI: propose entities, relations, and constraints.",
          "Generate SQL with context awareness and safety hints.",
          "Create targeted anonymized test data.",
        ],
      },
      {
        heading: "Safety",
        points: [
          "Non-destructive previews for schema diffs.",
          "Readonly mode for production connections.",
        ],
      },
    ],
    steps: [
      { title: "Connect Database", detail: "Postgres, MySQL, SQL Server, MongoDB, and more." },
      { title: "Visualize & Model", detail: "See ERDs and let AI propose improvements." },
      { title: "Query & Seed", detail: "Generate queries and mock datasets for dev/test." },
    ],
    integrations: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB", "SQLite", "Snowflake (RO)"],
    faqs: [
      { q: "Can it export ER diagrams?", a: "Yes — export to PNG/SVG and embed in docs or wikis." },
      { q: "Will it run queries directly?", a: "You control execution. Queries are proposed with explanations and are opt-in to run." },
    ],
    cta: { label: "Try AI for DB", to: "/register" },
    collapsible: [
      { title: "Model DB with AI", content: "Generate, modify, and improve schema proposals with diffs." },
      { title: "Generate Queries", content: "Turn natural language into safe SQL with rationale." },
      { title: "Generate Mock Data", content: "Create anonymized, realistic datasets for testing." },
    ],
  },
};

/** Optional: small lookup to render landing chips if you want to reuse */
const LANDING_FEATURES = [
  { slug: "ai-assistance", link: "/ai-assistance" },
  { slug: "ai-bots", link: "/ai-bots" },
  { slug: "ai-documentation", link: "/ai-documentation" },
  { slug: "ai-database", link: "/ai-database" },
];

const SectionCard = ({ title, points }) => (
  <Card
    sx={{
      backgroundColor: "#111827",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(255,255,255,0.08)",
      height: "100%",
    }}
  >
    <CardContent>
      <Typography variant="h6" sx={{ color: "#8b5cf6", fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      <Stack spacing={1.2}>
        {points.map((p, i) => (
          <Stack key={i} direction="row" spacing={1.2} alignItems="flex-start">
            <CheckIcon sx={{ fontSize: 18, mt: "2px", color: "#22c55e" }} />
            <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
              {p}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

const StepCard = ({ index, title, detail }) => (
  <Card
    sx={{
      backgroundColor: "#0f172a",
      borderRadius: "12px",
      border: "1px solid rgba(139,92,246,0.3)",
      height: "100%",
    }}
  >
    <CardContent>
      <Chip
        label={`Step ${index}`}
        sx={{
          backgroundColor: "#1e293b",
          color: "#fff",
          fontWeight: 600,
          mb: 1.5,
        }}
      />
      <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
        {detail}
      </Typography>
    </CardContent>
  </Card>
);

const FeatureDetailPage = () => {
  const { slug: rawSlug } = useParams();
  const navigate = useNavigate();

  // Allow routes like /ai-assistance (your current link) to resolve slug "ai-assistance"
  const slug = useMemo(() => (rawSlug || "").replace(/^\//, ""), [rawSlug]);
  const feature = FEATURE_DETAILS[slug];

  if (!feature) {
    return (
      <Box sx={{ py: 12, backgroundColor: "#0b0f19", color: "#fff" }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Feature Not Found</Typography>
          <Typography sx={{ opacity: 0.8, mb: 4 }}>
            The feature you’re looking for doesn’t exist or the link is outdated.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#6B46C1", borderRadius: "24px" }}
            onClick={() => navigate("/#features")}
          >
            Back to Features
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: "#0b0f19", color: "#fff" }}>
      <Container maxWidth="lg">
        {/* Top breadcrumb / back */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Button
            component={RouterLink}
            to="/#features"
            variant="outlined"
            sx={{
              borderColor: "rgba(139,92,246,0.5)",
              color: "#c4b5fd",
              textTransform: "none",
              borderRadius: "24px",
            }}
            startIcon={<ArrowForwardIosIcon sx={{ transform: "rotate(180deg)" }} />}
          >
            Back to Features
          </Button>
        </Stack>

        {/* HERO */}
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            backgroundColor: "#111827",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(255,255,255,0.10)",
            overflow: "hidden",
            mb: 5,
          }}
        >
          <CardContent sx={{ flex: 1.2, p: { xs: 3, md: 4 } }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={1.5}>
              {feature.icon}
              <Typography
                variant="h6"
                sx={{ color: "#8b5cf6", fontWeight: 700, textTransform: "uppercase" }}
              >
                {feature.title}
              </Typography>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.15 }}>
              {feature.subtitle}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
              {feature.description}
            </Typography>

            {!!feature.badges?.length && (
              <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                {feature.badges.map((b, i) => (
                  <Chip key={i} label={b} sx={{ backgroundColor: "#1e293b", color: "#fff" }} />
                ))}
              </Stack>
            )}

            <CardActions sx={{ p: 0, pt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6B46C1",
                  fontWeight: 700,
                  borderRadius: "28px",
                  textTransform: "none",
                  px: 3,
                  py: 1.2,
                }}
                endIcon={<ArrowForwardIosIcon />}
                component={RouterLink}
                to={feature?.cta?.to || "/register"}
              >
                {feature?.cta?.label || "Get Started"}
              </Button>
            </CardActions>
          </CardContent>

          <CardContent
            sx={{
              flex: 1,
              p: { xs: 3, md: 4 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {feature.heroImage ? (
              <Box>
                <img
                  src={feature.heroImage}
                  alt={feature.title}
                  style={{
                    maxWidth: "260px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(255,255,255,0.15)",
                    objectFit: "contain",
                  }}
                />
              </Box>
            ) : (
              <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                {(feature.badges || []).slice(0, 10).map((badge, idx) => (
                  <Chip
                    key={idx}
                    label={badge}
                    sx={{ backgroundColor: "#0f172a", color: "#fff" }}
                  />
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* HIGHLIGHTS */}
        {!!feature.highlights?.length && (
          <Box sx={{ mx: "auto", maxWidth: "90%", mb: 5 }}>
            <Grid container spacing={2.5}>
              {feature.highlights.map((h, i) => (
                <Grid key={i} item xs={12} md={6} lg={3}>
                  <Card
                    sx={{
                      backgroundColor: "#0f172a",
                      borderRadius: "12px",
                      border: "1px solid rgba(148,163,184,0.2)",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ color: "#e5e7eb", fontWeight: 700 }}>
                        {h}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* WHAT / WHY (two-up or more) */}
        {!!feature.sections?.length && (
          <Box sx={{ mx: "auto", maxWidth: "90%", mb: 5 }}>
            <Grid container spacing={2.5}>
              {feature.sections.map((sec, i) => (
                <Grid key={i} item xs={12} md={6}>
                  <SectionCard title={sec.heading} points={sec.points} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* HOW IT WORKS */}
        {!!feature.steps?.length && (
          <Box sx={{ mx: "auto", maxWidth: "90%", mb: 5 }}>
            <Typography
              variant="h5"
              sx={{ color: "#8b5cf6", textTransform: "uppercase", fontWeight: 800, mb: 2 }}
            >
              How it Works
            </Typography>
            <Grid container spacing={2.5}>
              {feature.steps.map((s, i) => (
                <Grid key={i} item xs={12} md={4}>
                  <StepCard index={i + 1} title={s.title} detail={s.detail} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* INTEGRATIONS */}
        {!!feature.integrations?.length && (
          <Box sx={{ mx: "auto", maxWidth: "90%", mb: 5 }}>
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontWeight: 800, mb: 1 }}
            >
              Integrations
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {feature.integrations.map((name, i) => (
                <Chip key={i} label={name} sx={{ backgroundColor: "#1e293b", color: "#fff" }} />
              ))}
            </Stack>
          </Box>
        )}

        {/* Collapsible (kept for AI Database parity) */}
        {!!feature.collapsible?.length && (
          <Box sx={{ mx: "auto", maxWidth: "90%", mb: 5 }}>
            {feature.collapsible.map((item, idx) => (
              <Accordion
                key={idx}
                sx={{ backgroundColor: "#1e293b", color: "#fff", mt: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{item.content}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        <Divider sx={{ borderColor: "rgba(148,163,184,0.2)", my: 4 }} />

        {/* FAQS */}
        {!!feature.faqs?.length && (
          <Box sx={{ mx: "auto", maxWidth: "90%", mb: 5 }}>
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontWeight: 800, mb: 1.5 }}
            >
              FAQs
            </Typography>
            {feature.faqs.map((f, i) => (
              <Accordion key={i} sx={{ backgroundColor: "#1e293b", color: "#fff", mt: 1.5 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {f.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">{f.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}

        {/* FINAL CTA */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6B46C1",
              fontWeight: 700,
              borderRadius: "28px",
              textTransform: "none",
              px: 3.5,
              py: 1.4,
            }}
            endIcon={<ArrowForwardIosIcon />}
            component={RouterLink}
            to={feature?.cta?.to || "/register"}
          >
            {feature?.cta?.label || "Get Started"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureDetailPage;
export { FEATURE_DETAILS, LANDING_FEATURES };

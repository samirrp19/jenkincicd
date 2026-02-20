// src/pages/AboutUsPage.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Chip,
  Avatar,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import HeaderLanding from "../components/HeaderLanding";
import { Link as RouterLink } from "react-router-dom";
import CheckIcon from "@mui/icons-material/CheckCircleOutline";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
import InsightsIcon from "@mui/icons-material/Insights";

const values = [
  { icon: <SecurityIcon />, title: "Trust & Security", desc: "Privacy-first design, least-privilege access, and audited pipelines across the stack." },
  { icon: <InsightsIcon />, title: "Pragmatic Innovation", desc: "AI where it helps most: code generation, tests, docs, and secure delivery." },
  { icon: <GroupsIcon />, title: "Customer Obsession", desc: "Work backwards from developer happiness and team throughput." },
  { icon: <CodeIcon />, title: "Craft & Clarity", desc: "Readable code, clear docs, automated checks, and repeatable workflows." },
];

const milestones = [
  { year: "2023", title: "The Spark", text: "Built the first Codex prototype to turn prompts into working apps." },
  { year: "2024", title: "From Proto → Platform", text: "Added AI-Test-Bot & CodexGuard; shipped DB modeling, docs, and bots." },
  { year: "2025", title: "Scale & Reliability", text: "Multi-tenant SaaS on AWS EKS, managed hosting, token billing, and teams." },
];

const team = [
  { name: "Manas", role: "AI Platform Architect", avatar: "/avatars/manas.png" },
  { name: "Suchismita", role: "Design & Community", avatar: "/avatars/suchi.png" },
  { name: "Avi", role: "Full-Stack Engineer", avatar: "/avatars/avi.png" },
  { name: "Riya", role: "DevRel & Docs", avatar: "/avatars/riya.png" },
];

const stats = [
  { label: "Apps Generated", value: "1,200+" },
  { label: "Tests Auto-Written", value: "15K+" },
  { label: "Sec Checks / Month", value: "50K+" },
  { label: "Avg. Time to First App", value: "18 min" },
];

const WhatWeDoCard = ({ icon, title, desc, chips }) => (
  <Card
    sx={{
      backgroundColor: "#111827",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(255,255,255,0.1)",
      height: "100%",
    }}
  >
    <CardContent>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: "#8b5cf6", mb: 1 }}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff" }}>
          {title}
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 1.5 }}>
        {desc}
      </Typography>
      {chips?.length ? (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {chips.map((c, i) => (
            <Chip key={i} label={c} size="small" sx={{ backgroundColor: "#1e293b", color: "#fff" }} />
          ))}
        </Stack>
      ) : null}
    </CardContent>
  </Card>
);

const AboutUsPage = () => {
  return (
    <>
      <HeaderLanding />

      <Box sx={{ py: 12, backgroundColor: "#0b0f19", color: "#fff" }}>
        <Container maxWidth="lg">
          {/* HERO */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h5"
              sx={{ textTransform: "uppercase", color: "#8b5cf6", fontWeight: 800, mb: 1 }}
            >
              About Us
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "2rem", md: "2.6rem" } }}
            >
              We’re building the fastest way from idea to production
            </Typography>
            <Typography variant="body1" sx={{ color: "#cbd5e1", maxWidth: 800, mx: "auto" }}>
              Codex helps teams design, generate, test, document, and securely ship software with
              AI-assisted workflows — from frontend to backend to databases, all on a modern DevSecOps spine.
            </Typography>
          </Box>

          {/* MISSION */}
          <Grid container spacing={3} sx={{ mb: 8 }}>
            <Grid item xs={12} md={7}>
              <Card sx={{ backgroundColor: "#111827", borderRadius: "12px" }}>
                <CardContent>
                  <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                    <RocketLaunchIcon sx={{ color: "#8b5cf6" }} />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      Our Mission
                    </Typography>
                  </Stack>
                  <Typography variant="body1" sx={{ color: "#e5e7eb", mb: 1.5 }}>
                    Put powerful, safe AI in the developer loop to multiply productivity without
                    sacrificing quality or security.
                  </Typography>
                  <Stack spacing={1}>
                    {[
                      "Shorten idea-to-deploy by automating the boring & brittle.",
                      "Bake in guardrails: tests, docs, SBOM, and policies by default.",
                      "Make best practices the easy path for every team.",
                    ].map((p, i) => (
                      <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                        <CheckIcon sx={{ color: "#22c55e", fontSize: 18, mt: "2px" }} />
                        <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                          {p}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card sx={{ backgroundColor: "#0f172a", borderRadius: "12px", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    What makes us different
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 1.5 }}>
                    Not just a code generator — Codex is an AI-powered delivery system with
                    tests, docs, security checks, and hosting options wired in.
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {["AI-Test-Bot", "CodexGuard", "RAG + Context", "CI/CD Hooks", "K8s on AWS EKS"].map(
                      (tag, i) => (
                        <Chip key={i} label={tag} size="small" sx={{ backgroundColor: "#1e293b", color: "#fff" }} />
                      )
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* WHAT WE DO */}
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            What we do
          </Typography>
          <Grid container spacing={3} sx={{ mb: 8 }}>
            <Grid item xs={12} md={4}>
              <WhatWeDoCard
                icon={<CodeIcon sx={{ color: "#8b5cf6" }} />}
                title="Generate & Refactor"
                desc="Prompt to production-ready scaffolds, PR-sized patches, safe refactors, and tests."
                chips={["React/Vite", "Node/Flask", "Phaser.js", "REST/OpenAPI"]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <WhatWeDoCard
                icon={<StorageIcon sx={{ color: "#60a5fa" }} />}
                title="Model & Query Data"
                desc="ERDs, schema advice, NL→SQL, and realistic mock data for dev/test."
                chips={["Postgres", "MySQL", "MongoDB", "SQLite"]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <WhatWeDoCard
                icon={<SecurityIcon sx={{ color: "#22c55e" }} />}
                title="Ship Securely"
                desc="CodexGuard policies, SBOM scanning, runtime alerts, and CI/CD gates."
                chips={["Kyverno", "Falco", "SCA/SAST", "mTLS/TLS"]}
              />
            </Grid>
          </Grid>

          {/* VALUES */}
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            Our values
          </Typography>
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {values.map((v, i) => (
              <Grid key={i} item xs={12} md={6} lg={3}>
                <Card sx={{ backgroundColor: "#111827", borderRadius: "12px", height: "100%" }}>
                  <CardContent>
                    <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.2 }}>
                      <Box sx={{ color: "#8b5cf6" }}>{v.icon}</Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#fff" }}>
                        {v.title}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                      {v.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* MILESTONES */}
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            Milestones
          </Typography>
          <Card sx={{ backgroundColor: "#111827", borderRadius: "12px", mb: 8 }}>
            <CardContent>
              <Stack divider={<Divider sx={{ borderColor: "rgba(148,163,184,0.2)" }} />}>
                {milestones.map((m) => (
                  <Stack
                    key={m.year}
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{ py: 2, alignItems: { md: "center" } }}
                  >
                    <Chip
                      label={m.year}
                      sx={{ backgroundColor: "#1e293b", color: "#fff", fontWeight: 700, mr: 1, minWidth: 84 }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#fff", minWidth: 240 }}>
                      {m.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                      {m.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* TEAM */}
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
            Meet the team
          </Typography>
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {team.map((t) => (
              <Grid key={t.name} item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: "#111827", borderRadius: "12px", textAlign: "center" }}>
                  <CardContent>
                    <Avatar
                      src={t.avatar}
                      alt={t.name}
                      sx={{ width: 84, height: 84, mx: "auto", mb: 1.5, bgcolor: "#6b46c1" }}
                    >
                      {t.name?.[0]}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#fff" }}>
                      {t.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#cbd5e1", mb: 1 }}>
                      {t.role}
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Chip label="LinkedIn" size="small" sx={{ backgroundColor: "#1e293b", color: "#fff" }} />
                      <Chip label="GitHub" size="small" sx={{ backgroundColor: "#1e293b", color: "#fff" }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* STATS */}
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {stats.map((s) => (
              <Grid key={s.label} item xs={6} md={3}>
                <Card sx={{ backgroundColor: "#0f172a", borderRadius: "12px", textAlign: "center" }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: "#8b5cf6" }}>
                      {s.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                      {s.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* CTA */}
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/register"
              sx={{
                backgroundColor: "#6B46C1",
                textTransform: "none",
                borderRadius: "28px",
                fontWeight: 800,
                px: 3,
                py: 1.2,
              }}
            >
              Start Free
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutUsPage;

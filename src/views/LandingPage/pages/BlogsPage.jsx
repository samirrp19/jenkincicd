// src/pages/BlogsPage.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HeaderLanding from "../components/HeaderLanding";

const blogs = [
  {
    slug: "ship-faster-with-ai-assisted-dev",
    title: "Ship Faster with AI-Assisted Development",
    excerpt:
      "Learn how Codex integrates AI generation, refactoring, and tests to shrink your idea-to-deploy cycle without sacrificing quality.",
    author: "Team Codex",
    date: "Sep 10, 2025",
    tags: ["AI", "Dev Productivity", "Best Practices"],
    image: "blog-ai-assisted.jpg", // optional
  },
  {
    slug: "designing-db-schemas-with-ai",
    title: "Designing Robust DB Schemas with AI",
    excerpt:
      "From ERD visualization to constraint suggestions, see how AI accelerates data modeling while keeping correctness front-and-center.",
    author: "Team Codex",
    date: "Sep 7, 2025",
    tags: ["Database", "ERD", "SQL"],
    image: "blog-db-schemas.jpg",
  },
  {
    slug: "docs-that-dont-go-stale",
    title: "Docs That Don’t Go Stale: Continuous AI Docs",
    excerpt:
      "Auto-generate API tables, diagrams, and module guides on every merge. Onboarding and cross-team clarity just got easier.",
    author: "Team Codex",
    date: "Sep 3, 2025",
    tags: ["Documentation", "Onboarding", "DX"],
    image: "blog-ai-docs.jpg",
  },
  {
    slug: "from-idea-to-app-in-hours",
    title: "From Idea to App in Hours, Not Weeks",
    excerpt:
      "A practical walkthrough of turning a one-line prompt into a running, hosted app with CI hooks and safe iterations.",
    author: "Team Codex",
    date: "Aug 28, 2025",
    tags: ["Full-stack", "CI/CD", "How-To"],
    image: "blog-idea-to-app.jpg",
  },
  {
    slug: "hosting-options-for-codex-apps",
    title: "Hosting Options for Codex Apps: Self vs Managed",
    excerpt:
      "Compare trade-offs between self-hosting and Codex managed hosting — cost, control, security, and scaling considerations.",
    author: "Team Codex",
    date: "Aug 20, 2025",
    tags: ["Hosting", "Kubernetes", "Cost"],
    image: "blog-hosting.jpg",
  },
];

const BlogCard = ({ post }) => {
  return (
    <Card
      sx={{
        flex: 1,
        backgroundColor: "#111827",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(255,255,255,0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Optional image */}
      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt={post.title}
          sx={{
            width: "100%",
            height: 160,
            objectFit: "cover",
            display: "block",
          }}
        />
      )}

      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
        <Typography
          variant="caption"
          sx={{ color: "#94a3b8" }}
        >{`${post.author} • ${post.date}`}</Typography>

        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{ color: "#e5e7eb", opacity: 0.9 }}>
          {post.excerpt}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
          {post.tags.map((t, idx) => (
            <Chip
              key={idx}
              label={t}
              size="small"
              sx={{ backgroundColor: "#1e293b", color: "#fff" }}
            />
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          component={RouterLink}
          to={`/blog/${post.slug}`}
          sx={{
            alignSelf: "flex-start",
            mt: 1,
            backgroundColor: "#6B46C1",
            textTransform: "none",
            borderRadius: "24px",
            fontWeight: 600,
            px: 2.2,
          }}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};

const BlogsPage = () => {
  return (
    <>
      <HeaderLanding />

      <Box sx={{ py: 12, backgroundColor: "#0b0f19", color: "#fff" }}>
        <Container maxWidth="lg">
          {/* Section Title */}
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              textTransform: "uppercase",
              color: "#8b5cf6",
              fontWeight: 700,
              mb: 1,
            }}
          >
            Blog
          </Typography>
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 6, fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            Insights, Guides & Updates
          </Typography>

          {/* Blog Grid */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            sx={{
              mx: "auto",
              maxWidth: "90%",
              flexWrap: "wrap",
            }}
          >
            {blogs.map((post) => (
              <Box
                key={post.slug}
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 calc(50% - 16px)", lg: "1 1 calc(33.33% - 16px)" },
                  minWidth: { md: "46%", lg: "30%" },
                }}
              >
                <BlogCard post={post} />
              </Box>
            ))}
          </Stack>

          {/* Optional: CTA to subscribe or explore docs */}
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/register"
              sx={{
                backgroundColor: "#8b5cf6",
                textTransform: "none",
                borderRadius: "24px",
                fontWeight: 700,
                px: 3,
                py: 1.2,
              }}
            >
              Get Started Free
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BlogsPage;

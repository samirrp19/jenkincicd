import React from 'react';
import {
  SigninCover as SigninCoverView,
  SignupCover as SignupCoverView,
  LandingPage as LandingPage,
  CommunityView,
  ProjectBuilderAppPage,
  ProjectStore,
  ProfilePageView,
  QuestionView,
  DashboardViewPage,
  GroupsView as GroupsViewPage,
  LiveStreamView,
  MessengerPageView,
  MarketPlaceView,
  AppStore,
  ProjectAIPage,
  AIWorkspacePage,
  AIPostBuilder,
  DashbboardView
} from 'views';
import useAuth from 'hooks/useAuth';
import withAuth from 'hooks/withAuth';
import CreateQuestion from './ChallengeView/components/CreateQuestion';
import GroupDetailsPage from './GroupsView/pages/GroupDetailsPage';
import CreateGroup from './GroupsView/components/CreateGroup';
import ContactUsPage from './LandingPage/components/ContactUsPage';
import DisclaimerPage from './LandingPage/pages/DisclaimerPage';
import PrivacyPolicyPage from './LandingPage/pages/PrivacyPolicyPage';
import TermsOfServicePage from './LandingPage/pages/TermsOfServicePage';
import FeatureDetailPage from './LandingPage/pages/FeatureDetailPage';
import PricingPage from './LandingPage/pages/PricingPage';
import BlogsPage from './LandingPage/pages/BlogsPage';
import AboutUsPage from './LandingPage/pages/AboutUsPage';
import Members from 'views/CommunityView/pages/MemberPage';
import ResetPasswordForm from 'components/ResetPasswordForm';
import OAuthCallbackHandler from 'views/SigninCover/OAuthCallbackHandler';
import CourseDetailsPage from 'views/ChallengeView/components/CourseDetailsPage';
import QuestionList from 'views/ChallengeView/components/QuestionList';
import HackathonLivePage from 'views/ChallengeView/components/HackathonLivePage';
import AppCommunityView from 'views/CommunityView/pages/AppCommunityView';
import ProgramCommunityView from 'views/CommunityView/pages/ProgramCommunityView';
import ChallengeCommunityView from 'views/CommunityView/pages/ChallengeCommunityView';
import HackathonCommunityView from 'views/CommunityView/pages/HackathonCommunityView';
import CompilerView from 'views/CompilerView/CompilerView';
import PracticePage from 'views/CommunityView/PracticePage';
import HackathonPage from 'views/CommunityView/HackathonPage';
import ChallengePage from 'views/CommunityView/ChallengePage';
import AIChat from 'views/AIChat/AIChat';



// Use a component to manage routes with access to hooks
const RouteConfig = () => {
  const { handleSetToken } = useAuth();

  // Public routes
  const publicRoutes = [
    {
      path: '/',
      renderer: (params = {}) => <LandingPage {...params} />,
    },
    {
      path: '/login',
      renderer: (params = {}) => <SigninCoverView {...params} setToken={handleSetToken} />,
    },
    {
      path: '/register',
      renderer: (params = {}) => <SignupCoverView {...params} />,
    },
    {
      path: '/api/auth/reset-password/:token',
      renderer: (params = {}) => <ResetPasswordForm {...params} />,
    },
    {
      path: '/oauth/callback',
      renderer: () => <OAuthCallbackHandler />,
    },
  
    {
      path: '/contact',
      renderer: (params = {}) => <ContactUsPage {...params} />,
    },
    {
      path: '/terms',
      renderer: (params = {}) => <TermsOfServicePage {...params} />,
    },
    {
      path: '/disclaimer',
      renderer: (params = {}) => <DisclaimerPage {...params} />,
    },
    {
      path: '/privacy-policy',
      renderer: (params = {}) => <PrivacyPolicyPage {...params} />,
    },
    {
      path: '/pricing',
      renderer: (params = {}) => <PricingPage {...params} />,
    },
    {
      path: '/blogs',
      renderer: (params = {}) => <BlogsPage {...params} />,
    },
    {
      path: '/about-us',
      renderer: (params = {}) => <AboutUsPage {...params} />,
    },

    {
      path: '/features/:slug',
      renderer: (params = {}) => <FeatureDetailPage {...params} />,
    },
    
    {
      path: '/course/:slug',
      renderer: (params = {}) => <CourseDetailsPage {...params} />,
    },
    {
      path: '/community/app',
      renderer: (params = {}) => <AppCommunityView {...params} />,
    },
    {
      path: '/community/program',
      renderer: (params = {}) => <ProgramCommunityView {...params} />,
    },
    {
      path: '/community/challenge',
      renderer: (params = {}) => <ChallengeCommunityView {...params} />,
    },
    {
      path: '/community/hackathon',
      renderer: (params = {}) => <HackathonCommunityView {...params} />,
    },
    {
      path: '/community/chat',
      renderer: (params = {}) => <AIChat {...params} />,
    },

    {
      path: '/hackathon/live/q1',
      renderer: (params = {}) => <HackathonLivePage {...params} />,
    }
  ];

  // Protected routes wrapped with withAuth
  const protectedRoutes = [
    { path: '/:username/community', component: CommunityView },
    { path: '/:username/profile', component: ProfilePageView },
    { path: '/:username/dashboard', component: DashbboardView },
    { path: '/:username/compiler', component: CompilerView },
    { path: '/:username/create-question', component: CreateQuestion },
    { path: '/:username/builder', component: ProjectBuilderAppPage },
    { path: '/:username/store', component: ProjectStore },
    { path: '/:username/messenger', component: MessengerPageView },
    { path: '/marketplace', component: MarketPlaceView },
    { path: '/:username/projects', component: AppStore },
    { path: '/:username/projects/ai/:projectId/', component: ProjectAIPage },
    { path: '/:username/projects/ai/:projectId/ws/:templateId', component: AIWorkspacePage },
    { path: '/:username/dashboard', component: DashboardViewPage },
    { path: '/:username/live', component: LiveStreamView },
    { path: '/questions', component: QuestionList },
    { path: '/questions/:id', component: QuestionView },
    { path: '/:username/groups', component: GroupsViewPage },
    { path: '/:username/groups/:groupId', component: GroupDetailsPage },
    { path: '/:username/groups/create', component: CreateGroup },
    { path: '/:username/practice', component: PracticePage },
    { path: '/:username/hackathons', component: HackathonPage },
    { path: '/:username/challenges', component: ChallengePage },
    { path: '/:username/friends', component: Members },
    { path: '/:username/projects/ai/:projectId/ws/:templateId/Editor', component: AIPostBuilder },
  ];

  // Combine public and protected routes
  const routes = [
    ...publicRoutes,
    ...protectedRoutes.map((route) => ({
      ...route,
      renderer: (params = {}) => withAuth(route.component)(params),
    })),
  ];

  return routes;
};

export default RouteConfig;

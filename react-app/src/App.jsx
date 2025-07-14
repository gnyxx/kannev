import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Registration from './pages/user/registration-page';
import UserDashboard from './pages/user/dashboard';
import Translation from './pages/user/translation';
import SignLevels from './pages/user/skill/Levels/sign-levels';
import BrailleLevel1 from './pages/user/skill/Main/brailleLessons/lesson1';
import BrailleLevel2 from './pages/user/skill/Main/brailleLessons/lesson2';
import BrailleLevel1Test from './pages/user/skill/Main/brailleTests/test1';
import BrailleLevel2Test from './pages/user/skill/Main/brailleTests/test2';
import Level1 from './pages/user/skill/Main/signLessons/lesson1';
import Level2 from './pages/user/skill/Main/signLessons/lesson2';
import BrailleLevels from './pages/user/skill/Levels/braille-levels';
import PronunciationLevels from './pages/user/skill/Levels/Pronunciation-levels';
import Level1Test from './pages/user/skill/Main/signTests/test1';
import Level2Test from './pages/user/skill/Main/signTests/test2';
import SignConvoLevel1 from './pages/user/activity/signConvo/level1';
import PointFocusLevel1 from './pages/user/activity/point-focus-1';
import AdminDashboard from './pages/admin/dashbord';
import Community from './pages/user/community';
import Login from './pages/user/login';
import ViewFeedback from './pages/admin/feedback';
import Progress from './pages/user/progress';
import ManageComm from './pages/admin/manage-community';
import SignLangCommunity from './pages/user/sign-lang-community';
import ManageSkill from './pages/admin/manage-skill';
import ManageActivity from './pages/admin/manage-activity';
import Feedback from './pages/user/feedback';
import PointFocusLevels from './pages/user/activity/braille-activity'
import MouthMOvementsLevels from './pages/user/activity/pronunciation-activity'
import SignLangConvoLevels from './pages/user/activity/Levels/sign-activity'
import AboutUs from './pages/user/about-us';
import PronunciationLevel1 from './pages/user/skill/Main/pronunciation';
import MouthMovementsLevel1 from './pages/user/activity/mouth-movement-level-1';
import Translation2 from './pages/user/translation2';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/user">
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="communities" element={<Community />} />
        <Route path="progress" element={<Progress />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="community/1" element={<SignLangCommunity />} />
        <Route path="about-us" element={<AboutUs />} />
       <Route path="skills">
          <Route path="sign-levels" element={<SignLevels />} />
          <Route path="sign-levels/1" element={<Level1 />} />
          <Route path="sign-levels/2" element={<Level2 />} />
          <Route path="sign-levels/1/test1" element={<Level1Test />} />
          <Route path="sign-levels/2/test2" element={<Level2Test />} />
          <Route path="braille-levels" element={<BrailleLevels />} />
          <Route path="braille-levels/1" element={<BrailleLevel1 />} />
          <Route path="braille-levels/2" element={<BrailleLevel2 />} />
          <Route path="braille-levels/1/test1" element={<BrailleLevel1Test />} />
          <Route path="braille-levels/2/test2" element={<BrailleLevel2Test />} />
          <Route path="pronunciation-levels" element={<PronunciationLevels />} />
          <Route path="pronunciation-levels/1" element={<PronunciationLevel1 />} />
       </Route>
       <Route path='activities'>
          <Route path="sign-lang-convo-levels" element={<SignLangConvoLevels />} />
          <Route path="sign-lang-convo-levels/1" element={<SignConvoLevel1 />} />
          <Route path="point-focus-levels" element={<PointFocusLevels />} />
          <Route path="point-focus-levels/1" element={<PointFocusLevel1 />} />
          <Route path="mouth-movements-levels" element={<MouthMOvementsLevels />} />
          <Route path="mouth-movements-levels/1" element={<MouthMovementsLevel1 />} />
       </Route>
       <Route path="translation" element={<Translation />} />
       <Route path="translation2" element={<Translation2 />} />
       </Route>
      <Route path="/admin">
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-skill" element={<ManageSkill/>} />
        <Route path="manage-activity" element={<ManageActivity/>} />
        <Route path="manage-community" element={<ManageComm/>} />
        <Route path="feedback" element={<ViewFeedback/>} />
      </Route>
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

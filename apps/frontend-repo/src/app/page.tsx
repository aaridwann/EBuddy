'use client';

import React from 'react';

import RootScreenContainer from '@/screens/Root/RootScreenContainer';
import LoadingComponent from '@/components/Loading';

const MainPage = () => (
  <React.Suspense fallback={<LoadingComponent/>}>
    <RootScreenContainer/>
  </React.Suspense>
);

export default MainPage;
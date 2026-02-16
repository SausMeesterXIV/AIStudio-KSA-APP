import React, { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { StrepenScreen } from './screens/StrepenScreen';
import { FriesScreen } from './screens/FriesScreen';
import { AgendaScreen } from './screens/AgendaScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AgendaManageScreen } from './screens/AgendaManageScreen';
import { FriesOverviewScreen } from './screens/FriesOverviewScreen';
import { ConsumptionOverviewScreen } from './screens/ConsumptionOverviewScreen';
import { RolesManageScreen } from './screens/RolesManageScreen';
import { TeamDrankDashboardScreen } from './screens/TeamDrankDashboardScreen';
import { TeamDrankStockScreen } from './screens/TeamDrankStockScreen';
import { TeamDrankBillingScreen } from './screens/TeamDrankBillingScreen';
import { TeamDrankInvoicesScreen } from './screens/TeamDrankInvoicesScreen';
import { NudgeSelectorScreen } from './screens/NudgeSelectorScreen';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [previousScreen, setPreviousScreen] = useState('home');

  // Handle Tab Navigation
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentScreen(tabId);
    window.scrollTo(0, 0);
  };

  // Handle Internal Routing (from Home dashboard)
  const handleInternalNavigate = (screenId: string) => {
    // Save previous screen for back navigation from sub-screens
    if (['strepen-overview', 'nudge-selector', 'roles-manage', 'team-drank-dashboard', 'team-drank-stock', 'team-drank-billing', 'team-drank-invoices'].includes(screenId)) {
      setPreviousScreen(currentScreen);
    }
    
    setCurrentScreen(screenId);
    
    if (['home', 'strepen', 'agenda', 'settings'].includes(screenId)) {
      setActiveTab(screenId);
    } else {
      // Keep active tab as home if navigating to a submodule
      const subModules = [
        'frieten', 
        'agenda-manage', 
        'fries-overview', 
        'strepen-overview',
        'nudge-selector', 
        'roles-manage',
        'team-drank-dashboard',
        'team-drank-stock',
        'team-drank-billing',
        'team-drank-invoices'
      ];
      
      if (subModules.includes(screenId)) {
        // Keep current tab active if within context (e.g. Strepen tab for strepen overview)
        if ((screenId === 'strepen-overview' || screenId === 'nudge-selector') && activeTab === 'strepen') {
           // do nothing, keep strepen tab active
        } else if (activeTab !== 'home' && !['strepen-overview', 'nudge-selector'].includes(screenId)) {
           setActiveTab('home');
        }
      }
    }
    window.scrollTo(0, 0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleInternalNavigate} />;
      case 'strepen':
        return <StrepenScreen 
          onNavigateOverview={() => handleInternalNavigate('strepen-overview')} 
          onNavigateNudge={() => handleInternalNavigate('nudge-selector')}
        />;
      case 'strepen-overview':
        return <ConsumptionOverviewScreen onBack={() => handleInternalNavigate(previousScreen)} />;
      case 'nudge-selector':
        return <NudgeSelectorScreen onBack={() => handleInternalNavigate(previousScreen)} />;
      case 'frieten':
        return <FriesScreen onNavigateOverview={() => handleInternalNavigate('fries-overview')} />;
      case 'fries-overview':
        return <FriesOverviewScreen onBack={() => handleInternalNavigate('frieten')} />;
      case 'roles-manage':
        return <RolesManageScreen onBack={() => handleInternalNavigate('home')} />;
      
      // Team Drank Screens
      case 'team-drank-dashboard':
        return <TeamDrankDashboardScreen onBack={() => handleInternalNavigate('home')} />;
      case 'team-drank-stock':
        return <TeamDrankStockScreen onBack={() => handleInternalNavigate('home')} />;
      case 'team-drank-billing':
        return <TeamDrankBillingScreen onBack={() => handleInternalNavigate('home')} />;
      case 'team-drank-invoices':
        return <TeamDrankInvoicesScreen onBack={() => handleInternalNavigate('home')} />;
        
      case 'agenda':
        return <AgendaScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'agenda-manage':
        return <AgendaManageScreen onBack={() => handleInternalNavigate('home')} />;
      default:
        return <HomeScreen onNavigate={handleInternalNavigate} />;
    }
  };

  return (
    <div className="text-base">
      {renderScreen()}
      {/* Hide bottom nav on full screen modals if desired */}
      {!['agenda-manage', 'fries-overview', 'strepen-overview', 'nudge-selector', 'roles-manage', 'team-drank-dashboard', 'team-drank-stock', 'team-drank-billing', 'team-drank-invoices'].includes(currentScreen) && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
};

export default App;
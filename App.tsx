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
import { NotificationsScreen } from './screens/NotificationsScreen';
import { NewMessageScreen } from './screens/NewMessageScreen';
import { MyInvoiceScreen } from './screens/MyInvoiceScreen';
import { Order, CartItem } from './types';
import { getCurrentUser } from './lib/data';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [previousScreen, setPreviousScreen] = useState('home');
  
  // Centralized balance state (starts at 25.00 like on Home/Invoice screens)
  const [balance, setBalance] = useState(25.00);

  // Centralized Fry Orders State
  const [friesOrders, setFriesOrders] = useState<Order[]>([]);

  const handleAddCost = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const handlePlaceFryOrder = (items: CartItem[], totalCost: number) => {
    const currentUser = getCurrentUser();
    
    // 1. Add cost to provisional balance
    handleAddCost(totalCost);

    // 2. Add order to global list
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      items: items,
      totalPrice: totalCost,
      date: new Date(),
      status: 'pending'
    };

    setFriesOrders(prev => [newOrder, ...prev]);
  };

  // Handle Tab Navigation
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentScreen(tabId);
    window.scrollTo(0, 0);
  };

  // Handle Internal Routing (from Home dashboard)
  const handleInternalNavigate = (screenId: string) => {
    // Save previous screen for back navigation from sub-screens
    if (['strepen-overview', 'nudge-selector', 'new-message', 'roles-manage', 'team-drank-dashboard', 'team-drank-stock', 'team-drank-billing', 'team-drank-invoices', 'my-invoice'].includes(screenId)) {
      setPreviousScreen(currentScreen);
    }
    
    setCurrentScreen(screenId);
    
    if (['home', 'strepen', 'agenda', 'notifications', 'settings'].includes(screenId)) {
      setActiveTab(screenId);
    } else {
      // Keep active tab logic
      const subModules = [
        'frieten', 
        'agenda-manage', 
        'fries-overview', 
        'strepen-overview',
        'nudge-selector',
        'new-message',
        'roles-manage',
        'team-drank-dashboard',
        'team-drank-stock',
        'team-drank-billing',
        'team-drank-invoices',
        'my-invoice'
      ];
      
      if (subModules.includes(screenId)) {
        if ((screenId === 'strepen-overview' || screenId === 'nudge-selector') && activeTab === 'strepen') {
           // keep strepen
        } else if (screenId === 'new-message' && activeTab === 'notifications') {
           // keep notifications
        } else if (activeTab !== 'home' && !['strepen-overview', 'nudge-selector', 'new-message'].includes(screenId)) {
           setActiveTab('home');
        }
      }
    }
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    handleInternalNavigate('home');
  };

  const renderScreen = () => {
    const currentUser = getCurrentUser();

    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleInternalNavigate} balance={balance} />;
      case 'strepen':
        return <StrepenScreen 
          onNavigateOverview={() => handleInternalNavigate('strepen-overview')} 
          onNavigateNudge={() => handleInternalNavigate('nudge-selector')}
          onNavigateInvoice={() => handleInternalNavigate('my-invoice')}
          onBack={handleBackToHome}
          currentBalance={balance}
          onAddCost={handleAddCost}
        />;
      case 'strepen-overview':
        return <ConsumptionOverviewScreen onBack={() => handleInternalNavigate(previousScreen)} />;
      case 'nudge-selector':
        return <NudgeSelectorScreen onBack={() => handleInternalNavigate(previousScreen)} />;
      case 'my-invoice':
        return <MyInvoiceScreen onBack={handleBackToHome} balance={balance} />;
      
      case 'notifications':
        return <NotificationsScreen onBack={handleBackToHome} />;
      case 'new-message':
        return <NewMessageScreen onBack={() => handleInternalNavigate(previousScreen)} />;

      case 'frieten':
        // Filter orders for current user history
        const myOrders = friesOrders.filter(o => o.userId === currentUser.id);
        return <FriesScreen 
          onNavigateOverview={() => handleInternalNavigate('fries-overview')} 
          onBack={handleBackToHome} 
          onPlaceOrder={handlePlaceFryOrder}
          myOrders={myOrders}
        />;
      case 'fries-overview':
        return <FriesOverviewScreen 
          onBack={() => handleInternalNavigate('frieten')} 
          orders={friesOrders}
        />;
      case 'roles-manage':
        return <RolesManageScreen onBack={handleBackToHome} />;
      
      // Team Drank Screens
      case 'team-drank-dashboard':
        return <TeamDrankDashboardScreen onBack={handleBackToHome} />;
      case 'team-drank-stock':
        return <TeamDrankStockScreen onBack={handleBackToHome} />;
      case 'team-drank-billing':
        return <TeamDrankBillingScreen onBack={handleBackToHome} />;
      case 'team-drank-invoices':
        return <TeamDrankInvoicesScreen onBack={handleBackToHome} />;
        
      case 'agenda':
        return <AgendaScreen onBack={handleBackToHome} />;
      case 'settings':
        return <SettingsScreen onBack={handleBackToHome} />;
      case 'agenda-manage':
        return <AgendaManageScreen onBack={handleBackToHome} />;
      default:
        return <HomeScreen onNavigate={handleInternalNavigate} balance={balance} />;
    }
  };

  return (
    <div className="text-base">
      {renderScreen()}
      {/* Hide bottom nav on full screen modals */}
      {!['agenda-manage', 'fries-overview', 'strepen-overview', 'nudge-selector', 'new-message', 'roles-manage', 'team-drank-dashboard', 'team-drank-stock', 'team-drank-billing', 'team-drank-invoices', 'my-invoice'].includes(currentScreen) && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
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
import { Order, CartItem, Notification, User } from './types';
import { getCurrentUser } from './lib/data';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [previousScreen, setPreviousScreen] = useState('home');
  
  // Centralized balance state (starts at 25.00 like on Home/Invoice screens)
  const [balance, setBalance] = useState(25.00);

  // Centralized Fry Orders State
  const [friesOrders, setFriesOrders] = useState<Order[]>([]);
  
  // 'closed' = not started
  // 'open' = ordering allowed
  // 'completed' = locked (review)
  // 'ordering' = calling frituur (no reopen)
  // 'ordered' = time set, waiting for pickup
  const [friesSessionStatus, setFriesSessionStatus] = useState<'open' | 'closed' | 'completed' | 'ordering' | 'ordered'>('closed');
  const [friesPickupTime, setFriesPickupTime] = useState<string | null>(null);

  // Centralized Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'official',
      sender: 'Hoofdleiding',
      role: 'ADMIN',
      title: 'Openstaande Drankrekening',
      content: 'Betaal a.u.b. je drankrekening van € 25,00 voor de maand oktober.',
      time: '2u geleden',
      isRead: false,
      action: '',
      icon: 'security',
      color: 'bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-500'
    },
    {
      id: 2,
      type: 'nudge',
      sender: 'Anonieme Nudge',
      role: '',
      title: '',
      content: '"Heb je wel genoeg gestreept gisterenavond?" 👀',
      time: '4u geleden',
      isRead: false,
      action: '',
      icon: 'sentiment_dissatisfied',
      color: 'bg-purple-100 dark:bg-purple-600/20 text-purple-600 dark:text-purple-400'
    },
    {
      id: 3,
      type: 'agenda',
      sender: 'Agenda Update',
      role: '',
      title: '',
      content: 'Vergadering leiding start over 15 minuten in lokaal 3.',
      time: '5u geleden',
      isRead: true,
      action: '',
      icon: 'event',
      color: 'bg-green-100 dark:bg-green-600/20 text-green-600 dark:text-green-500'
    },
    {
      id: 4,
      type: 'nudge',
      sender: 'Anonieme Nudge',
      role: '',
      title: '',
      content: 'Vergeet het lokaal niet te vegen na de activiteit!',
      time: 'Gisteren, 18:30',
      isRead: true,
      action: '',
      icon: 'cleaning_services',
      color: 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400'
    },
    {
      id: 5,
      type: 'official',
      sender: 'Hoofdleiding',
      role: '',
      title: 'Inschrijvingen Geopend',
      content: 'De inschrijvingen voor het weekend staan open.',
      time: 'Gisteren, 10:00',
      isRead: true,
      action: '',
      icon: 'assignment',
      color: 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400'
    }
  ]);

  const handleAddNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = {
      ...notification,
      id: Date.now(), // simple ID generation
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleMarkNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleAddCost = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const handlePlaceFryOrder = (items: CartItem[], totalCost: number, targetUser?: User) => {
    const currentUser = getCurrentUser();
    
    // Determine who the order is for
    const orderForUser = targetUser || currentUser;

    // 1. Add cost to provisional balance (only if ordering for self, otherwise it goes to target's debt in backend)
    // In this demo, we update the local balance view only if it's for self
    if (!targetUser) {
        handleAddCost(totalCost);
    }

    // 2. Add order to global list
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: orderForUser.id,
      userName: orderForUser.name,
      items: items,
      totalPrice: totalCost,
      date: new Date(),
      status: 'pending' 
    };

    setFriesOrders(prev => [newOrder, ...prev]);

    // 3. If ordering for someone else, add a fraud-prevention notification
    if (targetUser) {
        handleAddNotification({
            type: 'official',
            sender: 'KSA Bestelsysteem',
            role: 'AUTO',
            title: 'Bestelling Geplaatst',
            content: `${currentUser.name} heeft zojuist een bestelling van € ${totalCost.toFixed(2)} op jouw naam geplaatst. Was jij dit niet? Meld dit dan bij de verantwoordelijke.`,
            time: 'Zonet',
            isRead: false,
            action: 'Melden',
            icon: 'shopping_cart',
            color: 'bg-orange-100 dark:bg-orange-600/20 text-orange-600 dark:text-orange-500'
        });
    }
  };

  const handleRemoveFryOrder = (orderId: string) => {
    const orderToRemove = friesOrders.find(o => o.id === orderId);
    if (orderToRemove) {
      // Refund the cost (only if it was for current user in this simplified state)
      const currentUser = getCurrentUser();
      if (orderToRemove.userId === currentUser.id) {
          handleAddCost(-orderToRemove.totalPrice);
      }
      // Remove from list
      setFriesOrders(prev => prev.filter(o => o.id !== orderId));
    }
  };

  // Archive current session to start a new one
  const handleArchiveSession = () => {
    // 1. Mark all 'pending' orders as 'completed' (history)
    setFriesOrders(prev => prev.map(o => ({ ...o, status: 'completed' })));
    
    // 2. Reset Session State
    setFriesSessionStatus('closed');
    setFriesPickupTime(null);
  };

  // Automatic Session Reset Logic
  useEffect(() => {
    if (friesSessionStatus === 'ordered' && friesPickupTime) {
      const checkTimeInterval = setInterval(() => {
        const now = new Date();
        const [hours, minutes] = friesPickupTime.split(':').map(Number);
        const pickupDate = new Date();
        pickupDate.setHours(hours, minutes, 0, 0);

        // If the pickup time has passed, automatically archive the session
        if (now >= pickupDate) {
          handleArchiveSession();
        }
      }, 10000); // Check every 10 seconds

      return () => clearInterval(checkTimeInterval);
    }
  }, [friesSessionStatus, friesPickupTime]);


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
        return <NotificationsScreen 
          onBack={handleBackToHome} 
          notifications={notifications}
          onMarkAsRead={handleMarkNotificationAsRead}
        />;
      case 'new-message':
        return <NewMessageScreen onBack={() => handleInternalNavigate(previousScreen)} />;

      case 'frieten':
        // Filter orders for current user history
        // NOTE: In a real app, you might want to see orders you placed for others too, or just your own.
        // For now, we show orders linked to the logged-in user ID.
        const myOrders = friesOrders.filter(o => o.userId === currentUser.id);
        return <FriesScreen 
          onNavigateOverview={() => handleInternalNavigate('fries-overview')} 
          onBack={handleBackToHome} 
          onPlaceOrder={handlePlaceFryOrder}
          onRemoveOrder={handleRemoveFryOrder}
          myOrders={myOrders}
          sessionStatus={friesSessionStatus}
          onSessionChange={setFriesSessionStatus}
          pickupTime={friesPickupTime}
        />;
      case 'fries-overview':
        return <FriesOverviewScreen 
          onBack={() => handleInternalNavigate('frieten')} 
          orders={friesOrders}
          sessionStatus={friesSessionStatus}
          onSessionChange={setFriesSessionStatus}
          pickupTime={friesPickupTime}
          onSetPickupTime={setFriesPickupTime}
          onArchiveSession={handleArchiveSession}
          onAddNotification={handleAddNotification}
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
        return <AgendaScreen 
          onBack={handleBackToHome} 
          notifications={notifications}
          onMarkAsRead={handleMarkNotificationAsRead}
        />;
      case 'settings':
        return <SettingsScreen onBack={handleBackToHome} />;
      case 'agenda-manage':
        return <AgendaManageScreen 
          onBack={handleBackToHome} 
          onAddNotification={handleAddNotification}
        />;
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
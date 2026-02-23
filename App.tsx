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
import { TeamDrankArchiveScreen } from './screens/TeamDrankArchiveScreen';
import { NudgeSelectorScreen } from './screens/NudgeSelectorScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { NewMessageScreen } from './screens/NewMessageScreen';
import { MyInvoiceScreen } from './screens/MyInvoiceScreen';
import { QuotesScreen } from './screens/QuotesScreen';
import { Order, CartItem, Notification, User, Event, Quote, CountdownItem } from './types';
import { getCurrentUser, MOCK_USERS } from './lib/data';

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

  // Centralized Countdown State (Array)
  // Default: Ensure one item is definitely in the future relative to "now"
  const [countdowns, setCountdowns] = useState<CountdownItem[]>(() => {
    const nextYear = new Date().getFullYear() + 1;
    // Create Date using numeric constructor (Year, MonthIndex, Day) for LOCAL time to avoid UTC offset issues
    // Month is 0-indexed, so 6 is July
    return [{
      id: '1',
      title: 'Groot Kamp',
      targetDate: new Date(nextYear, 6, 21) 
    }];
  });

  // Centralized Quotes State
  // Mock data updated to use arrays for likes/dislikes. '1' is the current user ID in data.ts
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      text: "Tibo is de opperkeizer 👑",
      authorId: '2',
      authorName: 'Luuk', // Nickname
      context: 'Tijdens de algemene vergadering',
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      likes: ['3', '4', '5', '6', '7', '8', '9', '10'], // Mock IDs
      dislikes: [],
      addedBy: '1'
    },
    {
      id: '2',
      text: "Is mayonaise eigenlijk een groente?",
      authorId: '4',
      authorName: 'Vrieze', // Nickname
      context: 'Tijdens het eten van frieten',
      date: new Date(new Date().setDate(new Date().getDate() - 10)),
      likes: ['2', '3'],
      dislikes: ['5'],
      addedBy: '1'
    },
    // Archived Quote (Older than 4 weeks) - High Score
    {
      id: '3',
      text: "Als het niet past, gebruiken we gewoon meer sjor touw.",
      authorId: '5',
      authorName: 'Ems',
      context: 'Kampopbouw 2023',
      date: new Date(new Date().setMonth(new Date().getMonth() - 2)), // 2 months ago
      likes: ['1', '2', '3', '4', '6', '7', '8'],
      dislikes: [],
      addedBy: '1'
    },
    // Archived Quote (Older than 4 weeks) - Low Score
    {
      id: '4',
      text: "Ik heb per ongeluk de choco in de soep gedaan.",
      authorId: '3',
      authorName: 'Sarah De Smet',
      context: 'Kookploeg blunder',
      date: new Date(new Date().setMonth(new Date().getMonth() - 3)), // 3 months ago
      likes: ['5'],
      dislikes: ['1', '2', '4', '6'],
      addedBy: '1'
    }
  ]);

  const handleVoteQuote = (id: string, type: 'like' | 'dislike') => {
    const currentUser = getCurrentUser();
    
    setQuotes(prev => prev.map(q => {
      if (q.id === id) {
        const hasLiked = q.likes.includes(currentUser.id);
        const hasDisliked = q.dislikes.includes(currentUser.id);
        
        let newLikes = [...q.likes];
        let newDislikes = [...q.dislikes];

        if (type === 'like') {
            if (hasLiked) {
                // Toggle OFF
                newLikes = newLikes.filter(uid => uid !== currentUser.id);
            } else {
                // Add Like, Remove Dislike if present
                newLikes.push(currentUser.id);
                if (hasDisliked) {
                    newDislikes = newDislikes.filter(uid => uid !== currentUser.id);
                }
            }
        } else if (type === 'dislike') {
            if (hasDisliked) {
                // Toggle OFF
                newDislikes = newDislikes.filter(uid => uid !== currentUser.id);
            } else {
                // Add Dislike, Remove Like if present
                newDislikes.push(currentUser.id);
                if (hasLiked) {
                    newLikes = newLikes.filter(uid => uid !== currentUser.id);
                }
            }
        }

        return { ...q, likes: newLikes, dislikes: newDislikes };
      }
      return q;
    }));
  };

  const handleAddQuote = (text: string, context: string, authorId: string) => {
    const currentUser = getCurrentUser();
    const author = MOCK_USERS.find(u => u.id === authorId);
    
    // Use Nickname if available, else full name
    const displayAuthorName = author ? (author.nickname || author.name) : 'Onbekend';

    const newQuote: Quote = {
      id: Date.now().toString(),
      text,
      authorId,
      authorName: displayAuthorName,
      context,
      date: new Date(),
      likes: [],
      dislikes: [],
      addedBy: currentUser.id
    };
    setQuotes([newQuote, ...quotes]);
  };

  const handleDeleteQuote = (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  // Centralized Events State
  const [events, setEvents] = useState<Event[]>([
    { 
      id: '1', 
      title: 'Leidingskring', 
      date: new Date(new Date().getFullYear(), 9, 12, 20, 0), // Oct 12
      location: 'Lokaal', 
      type: 'vergadering', 
      startTime: '20:00',
      description: 'Maandelijkse vergadering.'
    },
    { 
      id: '2', 
      title: 'Startdag Voorbereiding', 
      date: new Date(new Date().getFullYear(), 9, 15, 14, 0), // Oct 15
      location: 'Terrein', 
      type: 'activiteit', 
      startTime: '14:00',
      description: 'Klaarzetten van sjorconstructies.'
    },
    { 
      id: '3', 
      title: 'Spaghetti Avond', 
      date: new Date(new Date().getFullYear(), 9, 21, 18, 0), // Oct 21
      location: 'Lokaal 4', 
      type: 'event', 
      startTime: '18:00',
      description: 'Gezellig eten met iedereen.'
    }
  ]);

  const handleSaveEvent = (event: Event) => {
    setEvents(prev => {
      const exists = prev.find(e => e.id === event.id);
      if (exists) {
        return prev.map(e => e.id === event.id ? event : e);
      } else {
        return [...prev, event];
      }
    });
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

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
    if (['strepen-overview', 'nudge-selector', 'new-message', 'roles-manage', 'team-drank-dashboard', 'team-drank-stock', 'team-drank-billing', 'team-drank-invoices', 'team-drank-archive', 'my-invoice', 'quotes', 'quotes-manage'].includes(screenId)) {
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
        'team-drank-archive',
        'my-invoice',
        'quotes',
        'quotes-manage'
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
        return <HomeScreen 
          onNavigate={handleInternalNavigate} 
          balance={balance} 
          events={events} 
          quotes={quotes}
          countdowns={countdowns}
        />;
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
      
      // Regular View (No Management Features) - Accessed via Home Widget
      case 'quotes':
        return <QuotesScreen 
          onBack={() => handleInternalNavigate(previousScreen)} 
          quotes={quotes}
          onVote={handleVoteQuote}
          onAddQuote={handleAddQuote}
          onDeleteQuote={handleDeleteQuote}
          enableManagement={false}
        />;

      // Admin View (Management Features) - Accessed via Sfeerbeheer Menu
      case 'quotes-manage':
        return <QuotesScreen 
          onBack={() => handleInternalNavigate(previousScreen)} 
          quotes={quotes}
          onVote={handleVoteQuote}
          onAddQuote={handleAddQuote}
          onDeleteQuote={handleDeleteQuote}
          enableManagement={true}
        />;

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
        return <TeamDrankDashboardScreen onBack={handleBackToHome} onNavigate={handleInternalNavigate} />;
      case 'team-drank-stock':
        return <TeamDrankStockScreen onBack={() => handleInternalNavigate('team-drank-dashboard')} />;
      case 'team-drank-billing':
        return <TeamDrankBillingScreen onBack={() => handleInternalNavigate('team-drank-dashboard')} />;
      case 'team-drank-invoices':
        return <TeamDrankInvoicesScreen onBack={() => handleInternalNavigate('team-drank-dashboard')} />;
      case 'team-drank-archive':
        return <TeamDrankArchiveScreen onBack={() => handleInternalNavigate('team-drank-dashboard')} />;
        
      case 'agenda':
        return <AgendaScreen 
          onBack={handleBackToHome} 
          notifications={notifications}
          onMarkAsRead={handleMarkNotificationAsRead}
          events={events}
        />;
      case 'settings':
        return <SettingsScreen onBack={handleBackToHome} />;
      case 'agenda-manage':
        return <AgendaManageScreen 
          onBack={handleBackToHome} 
          onAddNotification={handleAddNotification}
          events={events}
          onSaveEvent={handleSaveEvent}
          onDeleteEvent={handleDeleteEvent}
          countdowns={countdowns}
          onSaveCountdowns={setCountdowns}
        />;
      default:
        return <HomeScreen 
          onNavigate={handleInternalNavigate} 
          balance={balance} 
          events={events} 
          quotes={quotes}
          countdowns={countdowns}
        />;
    }
  };

  return (
    <div className="text-base">
      {renderScreen()}
      {/* Bottom Nav is now unconditionally rendered */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default App;
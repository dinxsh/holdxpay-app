import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Transaction {
  _id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Balance {
  escrow: number;
  available: number;
  locked: number;
}

export default function TransactionsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
  const [dateRange, setDateRange] = React.useState<{start: string | null; end: string | null}>({
    start: null,
    end: null
  });

  // More sample transactions
  const transactions: Transaction[] = [
    {
      _id: '1',
      type: 'credit',
      amount: 500.00,
      description: 'Payment received from John Doe',
      date: '2024-03-20',
      status: 'completed'
    },
    {
      _id: '2',
      type: 'debit',
      amount: 150.00,
      description: 'Service payment to Sarah Smith',
      date: '2024-03-19',
      status: 'completed'
    },
    {
      _id: '3',
      type: 'credit',
      amount: 1200.00,
      description: 'Project completion payment',
      date: '2024-03-18',
      status: 'pending'
    },
    {
      _id: '4',
      type: 'debit',
      amount: 75.50,
      description: 'Software subscription',
      date: '2024-03-17',
      status: 'failed'
    },
    {
      _id: '5',
      type: 'credit',
      amount: 850.00,
      description: 'Consulting fee',
      date: '2024-03-16',
      status: 'completed'
    }
  ];

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Type filter
    const matchesType = !selectedType || transaction.type === selectedType;

    // Status filter
    const matchesStatus = !selectedStatus || transaction.status === selectedStatus;

    // Date range filter
    const transactionDate = new Date(transaction.date);
    const matchesDateRange = (!dateRange.start || new Date(dateRange.start) <= transactionDate) &&
      (!dateRange.end || new Date(dateRange.end) >= transactionDate);

    return matchesSearch && matchesType && matchesStatus && matchesDateRange;
  });

  // Filter options
  const typeOptions = ['credit', 'debit'];
  const statusOptions = ['completed', 'pending', 'failed'];

  // Add balance data
  const balanceData: Balance = {
    escrow: 2500.00,
    available: 1800.00,
    locked: 700.00
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.tint }]}
            onPress={() => console.log('Send money')}
          >
            <FontAwesome name="paper-plane" size={16} color="white" />
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.tint }]}
            onPress={() => console.log('Request money')}
          >
            <FontAwesome name="download" size={16} color="white" />
            <Text style={styles.actionButtonText}>Request</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Cards */}
        <View style={styles.balanceCards}>
          <View style={[styles.balanceCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.balanceLabel, { color: colors.text }]}>Escrow</Text>
            <Text style={[styles.balanceAmount, { color: colors.text }]}>
              ${balanceData.escrow.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.balanceCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.balanceLabel, { color: colors.text }]}>Available</Text>
            <Text style={[styles.balanceAmount, { color: colors.text }]}>
              ${balanceData.available.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.balanceCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.balanceLabel, { color: colors.text }]}>Locked</Text>
            <Text style={[styles.balanceAmount, { color: colors.text }]}>
              ${balanceData.locked.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Transactions Card with Filters */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Transactions</Text>
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: colors.tint }]}
              onPress={() => console.log('Add transaction')}
            >
              <FontAwesome name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search and Filters */}
          <View style={styles.filters}>
            <View style={[styles.searchBar, { backgroundColor: colors.background }]}>
              <FontAwesome name="search" size={16} color={colors.text} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search transactions..."
                placeholderTextColor={colors.text + '80'}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            <View style={styles.filterRow}>
              <TouchableOpacity 
                style={[
                  styles.filterButton, 
                  { 
                    backgroundColor: colors.background,
                    borderColor: selectedType ? colors.tint : 'transparent',
                    borderWidth: 1,
                  }
                ]}
                onPress={() => {
                  // Toggle through type options
                  const currentIndex = selectedType ? typeOptions.indexOf(selectedType) : -1;
                  const nextIndex = (currentIndex + 1) % (typeOptions.length + 1);
                  setSelectedType(nextIndex === typeOptions.length ? null : typeOptions[nextIndex]);
                }}
              >
                <Text style={[styles.filterButtonText, { color: colors.text }]}>
                  {selectedType ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1) : 'Type'}
                </Text>
                <FontAwesome name="chevron-down" size={12} color={colors.text} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.filterButton, 
                  { 
                    backgroundColor: colors.background,
                    borderColor: dateRange.start ? colors.tint : 'transparent',
                    borderWidth: 1,
                  }
                ]}
                onPress={() => {
                  // For demo, just toggle last 7 days filter
                  const today = new Date();
                  const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
                  setDateRange(prev => ({
                    start: prev.start ? null : sevenDaysAgo.toISOString().split('T')[0],
                    end: prev.end ? null : new Date().toISOString().split('T')[0],
                  }));
                }}
              >
                <Text style={[styles.filterButtonText, { color: colors.text }]}>
                  {dateRange.start ? 'Last 7 days' : 'Date Range'}
                </Text>
                <FontAwesome name="calendar" size={12} color={colors.text} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.filterButton, 
                  { 
                    backgroundColor: colors.background,
                    borderColor: selectedStatus ? colors.tint : 'transparent',
                    borderWidth: 1,
                  }
                ]}
                onPress={() => {
                  // Toggle through status options
                  const currentIndex = selectedStatus ? statusOptions.indexOf(selectedStatus) : -1;
                  const nextIndex = (currentIndex + 1) % (statusOptions.length + 1);
                  setSelectedStatus(nextIndex === statusOptions.length ? null : statusOptions[nextIndex]);
                }}
              >
                <Text style={[styles.filterButtonText, { color: colors.text }]}>
                  {selectedStatus ? selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) : 'Status'}
                </Text>
                <FontAwesome name="chevron-down" size={12} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Transactions List - Update to use filteredTransactions */}
          {filteredTransactions.map((transaction) => (
            <View 
              key={transaction._id} 
              style={styles.transactionRow}
            >
              <View style={styles.transactionInfo}>
                <Text style={[styles.description, { color: colors.text }]}>
                  {transaction.description}
                </Text>
                <Text style={[styles.date, { color: colors.text }]}>
                  {new Date(transaction.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.transactionMeta}>
                <Text style={[
                  styles.amount, 
                  { 
                    color: transaction.type === 'credit' ? colors.tint : colors.text 
                  }
                ]}>
                  {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </Text>
                <View style={[
                  styles.status,
                  { backgroundColor: colors.tint + '33' }
                ]}>
                  <Text style={[styles.statusText, { color: colors.tint }]}>
                    {transaction.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Add empty state */}
          {filteredTransactions.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: colors.text }]}>
                No transactions found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    opacity: 0.6,
  },
  transactionMeta: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  balanceCards: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  balanceCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    opacity: 0.7,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  filters: {
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});

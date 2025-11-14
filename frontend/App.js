import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Imagine sugestivă pentru pagina cu evenimente
const HERO_IMAGE_URL =
  'https://via.placeholder.com/600x200?text=Evenimente+Timisoara';

// MOCK Events (până conectăm API real)
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Concert Rock în Timișoara',
    date: '2025-11-20',
    locationName: 'Sala Capitol',
    latitude: 45.7542,
    longitude: 21.2272,
    imageUrl: 'https://via.placeholder.com/300x150?text=Concert',
  },
  {
    id: '2',
    title: 'Festival de teatru',
    date: '2025-11-22',
    locationName: 'Teatrul Național Timișoara',
    latitude: 45.7549,
    longitude: 21.2257,
    imageUrl: 'https://via.placeholder.com/300x150?text=Teatru',
  },
  {
    id: '3',
    title: 'Târg de Crăciun',
    date: '2025-12-01',
    locationName: 'Piața Victoriei',
    latitude: 45.7537,
    longitude: 21.2253,
    imageUrl: 'https://via.placeholder.com/300x150?text=Targ+de+Craciun',
  },
];

/* ------------------ AUTH SCREEN ------------------ */

function AuthScreen({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // login | register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert('Completați toate câmpurile.');
      return;
    }
    onAuthSuccess();
  };

  const handleRegister = () => {
    if (!email.trim() || !password.trim() || !confirmPass.trim()) {
      alert('Completați toate câmpurile.');
      return;
    }

    if (password !== confirmPass) {
      alert('Parolele nu se potrivesc!');
      return;
    }

    // AICI vei pune API-ul real de register mai târziu
    alert('Cont creat cu succes! Te-ai autentificat automat.');
    onAuthSuccess();
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <StatusBar style="light" />

      <Text style={styles.authTitle}>BegaVibe</Text>
      <Text style={styles.authSubtitle}>
        {mode === 'login'
          ? 'Conectează-te pentru a vedea evenimentele'
          : 'Creează un cont nou'}
      </Text>

      <Text style={styles.authLabel}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: nume@exemplu.com"
        placeholderTextColor="#6b7280"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.authLabel}>Parolă</Text>
      <TextInput
        style={styles.input}
        placeholder="Parola"
        placeholderTextColor="#6b7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {mode === 'register' && (
        <>
          <Text style={styles.authLabel}>Confirmă parola</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmare parolă"
            placeholderTextColor="#6b7280"
            value={confirmPass}
            onChangeText={setConfirmPass}
            secureTextEntry
          />
        </>
      )}

      <TouchableOpacity
        style={styles.authButton}
        onPress={mode === 'login' ? handleLogin : handleRegister}
      >
        <Text style={styles.authButtonText}>
          {mode === 'login' ? 'Continuă' : 'Creează cont'}
        </Text>
      </TouchableOpacity>

      {mode === 'login' ? (
        <TouchableOpacity onPress={() => setMode('register')}>
          <Text style={styles.switchModeText}>Nu ai cont? Creează unul!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setMode('login')}>
          <Text style={styles.switchModeText}>Ai deja cont? Autentifică-te!</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

/* ------------------ MAIN SCREEN ------------------ */

function MainScreen() {
  const [events] = useState(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const scrollRef = useRef(null);

  // funcția care e apelată DOAR când apeși pe butonul din card
  const handleShowOnMap = (event) => {
    setSelectedEvent(event);
    scrollRef.current?.scrollTo({ x: SCREEN_WIDTH, animated: true });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
        <Text style={styles.cardLocation}>{item.locationName}</Text>

        {/* Butonul care duce la "hartă" */}
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => handleShowOnMap(item)}
        >
          <Text style={styles.mapButtonText}>Vezi pe hartă</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
      >
        {/* Pagina 1 – Lista */}
        <View style={[styles.page, { width: SCREEN_WIDTH }]}>
          {/* Imagine sugestivă sus */}
          <Image
            source={{ uri: HERO_IMAGE_URL }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <Text style={styles.mainTitle}>Evenimente Timișoara</Text>

          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Pagina 2 – Harta mock */}
        <View style={[styles.page, { width: SCREEN_WIDTH }]}>
          <Text style={styles.mainTitle}>Harta Timișoarei (mock)</Text>
          <Text style={styles.mainSubtitle}>
            Bulele mov arată evenimentele (de probă) 💜
          </Text>

          <View style={styles.fakeMap}>
            {events.map((e) => (
              <View key={e.id} style={styles.fakeMapEventRow}>
                <View style={styles.purpleDotOuter}>
                  <View style={styles.purpleDotInner} />
                </View>
                <Text style={{ marginLeft: 12 }}>{e.title}</Text>
              </View>
            ))}
          </View>

          {selectedEvent && (
            <View style={styles.selectedEventBox}>
              <Text style={styles.selectedEventTitle}>{selectedEvent.title}</Text>
              <Text style={styles.selectedEventText}>
                Locație: {selectedEvent.locationName}
              </Text>
              <Text style={styles.selectedEventText}>
                Dată: {selectedEvent.date}
              </Text>
            </View>
          )}

          {!selectedEvent && (
            <View style={styles.selectedEventBox}>
              <Text style={styles.selectedEventText}>
                Apasă pe „Vezi pe hartă” la un eveniment ca să-l vezi aici.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ------------------ ROOT APP ------------------ */

export default function App() {
  const [logged, setLogged] = useState(false);

  return logged ? (
    <MainScreen />
  ) : (
    <AuthScreen onAuthSuccess={() => setLogged(true)} />
  );
}

/* ------------------ STILURI ------------------ */

const styles = StyleSheet.create({
  // AUTH
  authContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
    justifyContent: 'center',
  },
  authTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  authSubtitle: {
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 24,
  },
  authLabel: {
    color: '#fff',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  authButton: {
    backgroundColor: '#22c55e',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  authButtonText: {
    color: '#022c22',
    fontWeight: '700',
    fontSize: 16,
  },
  switchModeText: {
    color: '#38bdf8',
    textAlign: 'center',
    marginTop: 12,
  },

  // MAIN
  mainContainer: { flex: 1, backgroundColor: '#f4f4f5' },
  page: { flex: 1, padding: 16 },
  heroImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 12,
  },
  mainTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  mainSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 12,
  },
  listContent: {
    paddingVertical: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardDate: {
    color: '#6b7280',
    fontSize: 13,
  },
  cardLocation: {
    marginTop: 4,
    color: '#374151',
  },
  mapButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#a855f7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  mapButtonText: {
    color: '#f9fafb',
    fontWeight: '600',
    fontSize: 13,
  },

  fakeMap: {
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    padding: 12,
    marginTop: 16,
  },
  fakeMapEventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  purpleDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(168,85,247,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  purpleDotInner: {
    width: 10,
    height: 10,
    backgroundColor: '#a855f7',
    borderRadius: 6,
  },

  selectedEventBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  selectedEventTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  selectedEventText: { marginTop: 4 },
});

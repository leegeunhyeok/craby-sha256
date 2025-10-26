import { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Sha256 } from 'craby-sha256';
import CryptoJS from 'crypto-js';
import QuickCrypto from 'react-native-quick-crypto';

const INPUT = 'Hello, world!';
const ITERATIONS = 25000;

function App() {
  const [benchmarkA, setBenchmarkA] = useState(null);
  const [benchmarkB, setBenchmarkB] = useState(null);
  const [benchmarkC, setBenchmarkC] = useState(null);
  const [isCalculating, setIsCalculating] = useState(true);

  useEffect(() => {
    const runBenchmark = () => {
      // A: craby-sha256
      const startTimeA = performance.now();
      for (let i = 0; i < ITERATIONS; i++) {
        Sha256.digest(INPUT + i);
      }
      const endTimeA = performance.now();
      const totalTimeA = endTimeA - startTimeA;
      const averageA = totalTimeA / ITERATIONS;

      setBenchmarkA({
        avg: averageA,
        total: totalTimeA,
      });

      // B: react-native-quick-crypto
      const startTimeB = performance.now();
      for (let i = 0; i < ITERATIONS; i++) {
        QuickCrypto.createHash('sha256')
          .update(INPUT + i)
          .digest('hex');
      }
      const endTimeB = performance.now();
      const totalTimeB = endTimeB - startTimeB;
      const averageB = totalTimeB / ITERATIONS;

      setBenchmarkB({
        avg: averageB,
        total: totalTimeB,
      });

      // C: crypto-js
      const startTimeC = performance.now();
      for (let i = 0; i < ITERATIONS; i++) {
        CryptoJS.SHA256(INPUT + i).toString();
      }
      const endTimeC = performance.now();
      const totalTimeC = endTimeC - startTimeC;
      const averageC = totalTimeC / ITERATIONS;
      setBenchmarkC({
        avg: averageC,
        total: totalTimeC,
      });

      setIsCalculating(false);
    };

    setTimeout(runBenchmark, 100);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            craby-sha256
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Input</Text>
            <Text style={styles.value}>{INPUT}</Text>
          </View>

          <View style={styles.arrow}>
            <Text style={styles.arrowText}>↓</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Output</Text>
            <Text style={styles.hash}>{Sha256.digest(INPUT)}</Text>
          </View>

          <View style={styles.benchmarkSection}>
            <Text style={styles.benchmarkTitle}>Performance Comparison</Text>
            <Text style={styles.benchmarkDescription}>(Generate SHA-256 hash {ITERATIONS.toLocaleString()} times)</Text>

            {isCalculating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#4a90e2" />
                <Text style={styles.loadingText}>
                  Running {ITERATIONS.toLocaleString()} iterations...
                </Text>
              </View>
            ) : (
              <>
                <View style={[styles.benchmarkCard, styles.libraryA]}>
                  <Text style={styles.libraryName}>craby-sha256</Text>
                  <Text style={styles.benchmarkValue}>
                    {benchmarkA.avg.toFixed(4)} ms
                  </Text>
                  <Text style={styles.benchmarkDetail}>
                    Total: {benchmarkA.total.toFixed(2)} ms
                  </Text>
                </View>

                <View style={[styles.benchmarkCard, styles.libraryB]}>
                  <Text style={styles.libraryName}>react-native-quick-crypto</Text>
                  <Text style={styles.benchmarkValue}>
                    {benchmarkB.avg.toFixed(4)} ms
                  </Text>
                  <Text style={styles.benchmarkDetail}>
                    Total: {benchmarkB.total.toFixed(2)} ms
                  </Text>
                </View>

                <View style={[styles.benchmarkCard, styles.libraryC]}>
                  <Text style={styles.libraryName}>crypto-js</Text>
                  <Text style={styles.benchmarkValue}>
                    {benchmarkC.avg.toFixed(4)} ms
                  </Text>
                  <Text style={styles.benchmarkDetail}>
                    Total: {benchmarkC.total.toFixed(2)} ms
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#000000',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  hash: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
    color: '#000000',
  },
  arrow: {
    alignItems: 'center',
    marginVertical: 16,
  },
  arrowText: {
    fontSize: 28,
    color: '#4a90e2',
  },
  benchmarkSection: {
    marginTop: 24,
  },
  benchmarkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
  },
  benchmarkDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 10,
  },
  loadingText: {
    fontSize: 13,
    color: '#666666',
  },
  benchmarkCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  libraryA: {
    backgroundColor: '#e8f4f8',
    borderWidth: 1.5,
    borderColor: '#4a90e2',
  },
  libraryB: {
    backgroundColor: '#f0e8f8',
    borderWidth: 1.5,
    borderColor: '#9b59b6',
  },
  libraryC: {
    backgroundColor: '#dff5d3',
    borderWidth: 1.5,
    borderColor: '#77dd77',
  },
  libraryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 6,
  },
  benchmarkValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  benchmarkDetail: {
    fontSize: 11,
    color: '#666666',
  },
});

export default App;

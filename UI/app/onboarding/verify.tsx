import { Brand } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View, ScrollView, TextInput, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { useUser } from '@/contexts/user-context';
import { VerifyIdentityPayload, VerificationCardProps } from '@/types';

export default function VerifyIdentityScreen() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [vehicleDescription, setVehicleDescription] = useState('');
  const [documents, setDocuments] = useState<Record<string, DocumentPicker.DocumentPickerAsset>>({});

  const verifyIdentityMutation = useMutation({
    mutationFn: (data: VerifyIdentityPayload) => api.user.verifyIdentity(data),
    onSuccess: (data) => {
      updateUser(data);
      router.replace('/(main)');
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to verify identity");
      console.error('Error verifying identity:', error);
    }
  });

  const handlePickDocument = async (docKey: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setDocuments(prev => ({
          ...prev,
          [docKey]: result.assets[0],
        }));
      }
    } catch (error) {
      Alert.alert("Error", "Could not pick document");
      console.error('Error picking document:', error);
    }
  };

  const handleRemoveDocument = (docKey: string) => {
    setDocuments(prev => {
      const newDocs = { ...prev };
      delete newDocs[docKey];
      return newDocs;
    });
  };

  const handleComplete = () => {
     verifyIdentityMutation.mutate({ vehicleDescription, documents });
  };

  const isDriver = user?.role === 'driver';
  const totalSteps = isDriver ? 4 : 3;
  const currentStep = isDriver ? 4 : 3;

  const requiredDocs = isDriver 
    ? ['driversLicense', 'vehicleRegistration', 'nationalId', 'insurance']
    : ['nationalId', 'proofOfBill'];
  
  const allDocsSelected = requiredDocs.every(key => documents[key]);
  const isReady = allDocsSelected && (!isDriver || vehicleDescription.trim().length > 0);

  const VerificationCard = ({ title, docKey, icon, md }: VerificationCardProps) => {
    const selectedFile = documents[docKey];
    const isUploaded = !!selectedFile;
    
    return (
      <View style={styles.card}>
         <View style={styles.cardInfo}>
            <View style={styles.cardIconBox}>
               <IconSymbol name={icon} md={md} color={isUploaded ? Brand.primary : '#AAA'} size={24} />
            </View>
            <View style={{ flex: 1, paddingRight: 10 }}>
               <ThemedText style={styles.cardTitle}>{title}</ThemedText>
               <ThemedText 
                 style={[styles.cardStatus, isUploaded && styles.statusVerified]}
                 numberOfLines={1}
                 ellipsizeMode="middle"
               >
                  {isUploaded ? selectedFile.name : "Pending Upload"}
               </ThemedText>
            </View>
         </View>
         {isUploaded ? (
            <Pressable style={styles.removeButton} onPress={() => handleRemoveDocument(docKey)}>
               <IconSymbol name="trash.fill" md="delete" color="#ff4d4d" size={16} />
            </Pressable>
         ) : (
            <Pressable style={styles.uploadButton} onPress={() => handlePickDocument(docKey)}>
               <IconSymbol name="arrow.up.doc.fill" md="cloud-upload" color="#FFF" size={16} />
               <ThemedText style={styles.uploadText}>Upload</ThemedText>
            </Pressable>
         )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="arrow.left" md="arrow-back" color="#FFF" size={24} />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Verify Your Identity</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.progressContainer}>
          <ThemedText style={styles.progressText}>Verification Progress</ThemedText>
          <ThemedText style={styles.stepText}>Step {currentStep} of {totalSteps}</ThemedText>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
        </View>

        <ThemedText style={styles.mainTitle}>Verify Your Identity</ThemedText>
        <ThemedText style={styles.mainSubtitle}>
           Please upload clear photos of your documents to ensure a quick approval process for CarryGo. Avoid glares and blurry images.
        </ThemedText>

        <View style={styles.cardsList}>
          {isDriver ? (
            <>
              <VerificationCard title="Driver's License" docKey="driversLicense" icon="person.text.rectangle.fill" md="badge" />
              <VerificationCard title="Vehicle Registration" docKey="vehicleRegistration" icon="doc.text.fill" md="description" />
              <VerificationCard title="National ID" docKey="nationalId" icon="doc.text.fill" md="recent-actors" />
              <VerificationCard title="Proof of Insurance" docKey="insurance" icon="shield.fill" md="security" />
              
              <View style={styles.descriptionSection}>
                <ThemedText style={styles.label}>Vehicle Description</ThemedText>
                <TextInput
                   style={styles.textArea}
                   multiline
                   numberOfLines={6}
                   placeholder="Lorem Ipsum..."
                   placeholderTextColor="#555"
                   value={vehicleDescription}
                   onChangeText={setVehicleDescription}
                />
              </View>
            </>
          ) : (
            <>
              <VerificationCard title="National ID" docKey="nationalId" icon="doc.text.fill" md="recent-actors" />
              <VerificationCard title="Proof of Bill Payment" docKey="proofOfBill" icon="doc.text.fill" md="receipt" />
            </>
          )}
        </View>

        <View style={styles.proTip}>
            <IconSymbol name="lightbulb.fill" md="lightbulb-outline" color={Brand.primary} size={24} />
            <View style={{ flex: 1 }}>
               <ThemedText style={styles.tipTitle}>Pro Tip</ThemedText>
               <ThemedText style={styles.tipText}>
                  Place your document on a dark, flat surface with good lighting for the best results.
               </ThemedText>
            </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={[styles.continueButton, isReady && styles.activeContinueButton, (!isReady || verifyIdentityMutation.isPending) && styles.buttonDisabled]} 
          onPress={handleComplete}
          disabled={!isReady || verifyIdentityMutation.isPending}
        >
          <ThemedText style={[styles.continueText, isReady && styles.activeContinueText]}>
            {verifyIdentityMutation.isPending ? 'Uploading...' : 'Complete Onboarding'}
          </ThemedText>
        </Pressable>
        {verifyIdentityMutation.isError && (
          <ThemedText style={styles.errorText}>
            Failed to verify identity. Please try again.
          </ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Brand.navy,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 12,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  progressText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepText: {
    color: '#AAA',
    fontSize: 14,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 40,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Brand.primary,
    borderRadius: 2,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  mainSubtitle: {
    fontSize: 16,
    color: '#AAA',
    lineHeight: 22,
    marginBottom: 32,
  },
  cardsList: {
    gap: 16,
    marginBottom: 32,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardLocked: {
    opacity: 0.5,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1, // Add flex: 1 to ensure text doesn't push buttons out
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardStatus: {
    color: '#AAA',
    fontSize: 14,
  },
  statusVerified: {
    color: Brand.primary,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  uploadText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 77, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionSection: {
    marginTop: 20,
    gap: 12,
  },
  label: {
    color: '#AAA',
    fontSize: 16,
  },
  textArea: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    height: 160,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  proTip: {
    flexDirection: 'row',
    backgroundColor: 'rgba(39, 214, 155, 0.05)',
    padding: 20,
    borderRadius: 16,
    gap: 16,
    marginBottom: 40,
  },
  tipTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tipText: {
    color: '#AAA',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: Brand.navy,
  },
  continueButton: {
    width: '100%',
    height: 64,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Default inactive color as seen in mockup
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContinueButton: {
    backgroundColor: Brand.primary,
  },
  continueText: {
    color: '#AAA',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeContinueText: {
    color: Brand.navy,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});

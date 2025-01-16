import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      expiresIn
      message
      success
      token
      user
    }
  }
`;


export const REMOVE_CONSULTATION = gql`
    mutation ConsultationRemoveById($id: MongoID!) {
        consultationRemoveById(_id: $id) {
        recordId
        }
    }
`;


export const UPDATE_CONSULTATION_STATUS = gql`
    mutation ConsultationUpdateById($id: MongoID!, $record: UpdateByIdConsultationInput!) {
        consultationUpdateById(_id: $id, record: $record) {
        record {
            status
        }
        }
    }
`;

export const UPDATE_CONSULTATION = gql`
    mutation ConsultationUpdateById($id: MongoID!, $record: UpdateByIdConsultationInput!) {
        consultationUpdateById(_id: $id, record: $record) {
        record {
            status
        }
        }
    }
`;

export const UPDATE_CONSULTATION_FEEDBACK = gql`
    mutation ConsultationUpdateById($id: MongoID!, $record: UpdateByIdConsultationInput!) {
        consultationUpdateById(_id: $id, record: $record) {
        record {
            call_center_feedback {
            comment
            createdAt
            user{
                _id
            }
            }
        }
        recordId
        error {
            message
            ... on ValidationError {
            message
            }
        }
        }
    }
`;

export const CREATE_CLINIC_ONE = gql`
    mutation ClinicCreateOne($record: CreateOneClinicInput!) {
        clinicCreateOne(record: $record) {
        record {
            city
            phoneNumber
            name
            region
            street_location
        }
        }
    }
`;

export const CREATE_USER_ONE = gql`
mutation UserCreateOne($record: CreateOneUserInput!) 
{
    userCreateOne(record: $record) {
        record {
          country
          email
          first_name
          last_name
          password
          phone
        }
        recordId
      }
  }
`;



export const REMOVE_CLINIC = gql`
    mutation ClinicRemoveById($id: MongoID!) {
        clinicRemoveById(_id: $id) {
        record {
            name
        }
        }
        }
`;

export const REMOVE_ROLE = gql`
    mutation RoleRemoveById($id: MongoID!) {
        roleRemoveById(_id: $id) {
        record {
            name
            description
        }
        }
    }
`;

export const REMOVE_VISITE = gql`
    mutation VisitRemoveById($id: MongoID!) {
        visitRemoveById(_id: $id) {
        record {
            notes
        }
        }
    }
`;

export const REMOVE_USER= gql`
    mutation UserRemoveById($id: MongoID!) {
        userRemoveById(_id: $id) {
        record {
            first_name
            email
        }
        }
    }
`;


export const REMOVE_PATIENT_BY_ID= gql`
    mutation PatientRemoveById($id: MongoID!) {
        patientRemoveById(_id: $id) {
        record {
            name
        }
        }
    }
`;



export const CREATE_ROLE_ONE = gql`
    mutation RoleCreateOne($record: CreateOneRoleInput!) {
        roleCreateOne(record: $record) {
        record {
            description
            name
        }
        }
    }
`;



export const UPDATE_PATIENT_STATUS = gql`
    mutation PatientUpdateById($id: MongoID!, $record: UpdateByIdPatientInput!) {
        patientUpdateById(_id: $id, record: $record) {
        record {
            status
        }
        }
    }
`;



export const CREATE_VISIT_ONE = gql`
    mutation VisitCreateOne($record: CreateOneVisitInput!) {
        visitCreateOne(record: $record) {
        record {
            diagnosis
            notes
            patient
            symptoms
            treatment
        }
        }
    }
`;

export const CREATE_LAB_RESUlT_ONE = gql`
    mutation LabResultCreateOne($record: CreateOneLabResultInput!) {
        labResultCreateOne(record: $record) {
        record {
            date
            medical_staff
            patient
            result
            type
        }
        }
    }
`;

export const CREATE_VACCINATION_ONE = gql`
    mutation VaccinationCreateOne($record: CreateOneVaccinationInput!) {
        vaccinationCreateOne(record: $record) {
        record {
            medical_staff
            patient
            date
            vaccine
        }
        }
    }
`;


export const CREATE_PRESCRIPTION_ONE = gql`
    mutation PrescriptionCreateOne($record: CreateOnePrescriptionInput!) {
        prescriptionCreateOne(record: $record) {
        record {
            contraindications
            dosage
            medication
            end_date
            start_date
        }
        }
    }
`;

export const CREATE_MEDICATION_ONE = gql`
    mutation MedicationCreateOne($record: CreateOneMedicationInput!) {
        medicationCreateOne(record: $record) {
        record {
            consultation
            createdBy
            description
            dosage
            end_date
            manufacturer
            name
            patient
            start_date
        }
        }
    }
`;


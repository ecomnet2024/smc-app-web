import { gql, useQuery } from '@apollo/client';

export const CONSULTATION_MANY = gql`
  query ConsultationMany {
    consultationMany {
      _id
      Contraindications
      
      createdAt
      emergency
      labResults
      medications
      patient{
        name
        sn
      }
      prescriptions
      status
      surgical_history
      temperature
      vaccinations
    }
  }
`;


export const CONSULTATION_BY_ID = gql`
  query ConsultationById($id: MongoID!) {
    consultationById(_id: $id) {
      emergency
      labResults
      medications
      patient {
        _id
        age
        name
        phone
        email
        createdAt
      }
      blood_pressure
      complain
      prescriptions
      photo_material
      vaccinations
      visits
      pulse
      status
      temperature
      updatedAt
      call_center_feedback{
        comment
        createdAt
        user{
          _id
          first_name
        }
      }
      doctor_feedback{
        comment
        user{
          _id
          first_name
        }
      }
    }
  }
`;


export const CLINIC_MANY = gql`
    query clinicMany  {
        clinicMany {
        _id
        city
        createdAt
        name
        phoneNumber
        region
        street_location
        }
    }
`;

export const ROLE_MANY = gql`
    query RoleMany {
        roleMany {
        _id
        createdAt
        description
        name
        updatedAt
        }
    }
`;


export const VISIT_MANY = gql`
  query VisitMany {
    visitMany {
      _id
      notes
      treatment
    }
  }
`;

export const VISIT_MANY_FILTER = gql`
  query VisitMany($filter: FilterFindManyVisitInput) {
    visitMany(filter: $filter) {
      _id
      notes
      treatment
      createdAt
      createdByDetails {
        first_name
        last_name
      }
    }
  }
`;

export const VACCINATION_MANY_FILTER = gql`
query VaccinationMany {
  vaccinationMany {
    vaccine
    createdAt
    createdByDetails {
      first_name
      last_name
    }
  }
}
`;

export const PRESCRIPTION_MANY_FILTER = gql`
query PrescriptionById($filter: FilterFindManyPrescriptionInput) {
  prescriptionMany(filter: $filter) {
    contraindications
    dosage
    end_date
    start_date
    createdByDetails {
      first_name
      last_name
    }
  }
}
`;

export const MEDICATIONS_MANY_FILTER = gql`
query MedicationMany($filter: FilterFindManyMedicationInput) {
  medicationMany(filter: $filter) {
    createdAt
    description
    dosage
    end_date
    start_date
    name
    manufacturer
    createdByDetails {
      first_name
      last_name
    }
  }
}
`;

export const LAB_RESULT_FILTER = gql`
  query LabResultMany($filter: FilterFindManyLabResultInput) {
    labResultMany(filter: $filter) {
      _id
      result
      type
      createdAt
      createdByDetails {
        first_name
        last_name
      }
    }
  }
`

export const CONSULATATION_MANY_FILTER = gql`
  query ConsultationMany($filter: FilterFindManyConsultationInput) {
    consultationMany(filter: $filter) {
      _id
      blood_pressure
      complain
      createdAt
      patient {
        name
        age
        sn
        createdAt
      }
      allergies
      allergy {
        description
        substance
      }
      photo_material
      pulse
    }
  }
`;


export const PATIENT_BY_ID = gql`
    query PatientById($id: MongoID!) {
      patientById(_id: $id) {
        age
        createdAt
        email
        gender
        insurance_number
        name
        phone
        status
      }
    }
`;


export const USER_MANY = gql`
    query UserMany {
        userMany {
          _id
          email
          first_name
          status
          updatedAt
          address
          phone
          role{
            name
          }
        }
    }
`;


export const PATIENT_MANY = gql`
    query patientMany {
      patientMany {
        _id
        age
        createdAt
        name
        status
        email
        sn
      }
    }
`;





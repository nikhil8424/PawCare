import { Provider } from '../types';

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'dharma-vet-clinic',
    name: 'Dharma Veterinary Clinic',
    tagline: 'Multi-specialty clinic with advanced surgery & diagnostics',
    type: 'Veterinary Clinic',
    category: 'vet',
    location: 'Bandra West, Mumbai',
    address: '14th Road, Near Khar Gymkhana, Bandra West, Mumbai',
    landmark: 'Opposite Khar Gymkhana Main Gate',
    pincode: '400052',
    latitude: 19.0600,
    longitude: 72.8339,
    distance: 1.2,
    rating: 4.9,
    reviewCount: 128,
    phone: '+91 98201 44552',
    emergencyPhone: '+91 98201 44550',
    openingHours: '8:00 AM - 9:00 PM (24/7 on call for emergencies)',
    isOpenNow: true,
    closesAt: '9:00 PM today',
    emergencyAvailable: true,
    consultationFee: 800,
    services: [
      'Comprehensive Consultations',
      'Vaccination & Immunity',
      'Advanced Diagnostics',
      'Emergency Care',
      'Orthopedic Surgery',
      'Dental Scaling & Polishing',
      'In-house Pharmacy',
      'Ultrasound & X-Ray'
    ],
    species: ['Dogs', 'Cats', 'Rabbits', 'Birds'],
    verified: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuComIlLgXDyMD_ayQ8W1cDp-uCEmMW34eZpJCCS3FL-baGhL8-GZZ3s2eHbl3A1u7IapE4FnWhB7J6352bZ3N-3f82jt-JkTw1w4KKbgtIpdixseHquN8X7BYbTZzevSLK9IK7bMSzxA_CXYwOj5zhCw0Xy4t62UXmMbOYcyMUeADXyfB9BYtsWL1JmDQ8SU_Fey31PCO7BJ6rr54ryAx1_8PgdOdKcBPH3r_vNsrTRJ9rIHimjYQoYMA',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsnljOz0Baq254fvf49wWXcp-_Pm1N8yQVIF9w6RHjBuZWahIQSPZ1VfN8z3KIYQsRwGjoFFXWNJspfoljepgSoKMoVp-i-xnnMm6dBwvFmzpnwkUXokQ55oTAIbHrZ4KgQwqo9OF04i7AxCwIAXr3XbMez0uE-0e17N3Avguo0Gc_YbNOEtSTeO1kHSvpTQIU7W07bg0M-hffc9hx0FZcceAgymHVlgUNISYgZKFRq90i0Bq4ge92bA',
    about: 'Dharma Veterinary Clinic is a state-of-the-art facility dedicated to providing compassionate, high-quality care for urban pets. Led by a team of experienced veterinarians, we offer comprehensive services ranging from routine wellness exams to advanced diagnostics and emergency interventions. Our clinic is designed to minimize stress for both pets and parents, ensuring a calm and professional environment.',
    doctors: [
      {
        name: 'Dr. Amit Sharma',
        designation: 'Senior Veterinary Surgeon & Medical Director',
        experience: '12+ years experience',
        degree: 'B.V.Sc & A.H, M.V.Sc (Veterinary Surgery - IVRI)',
        specialization: 'Soft Tissue & Orthopedic Surgery',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80'
      },
      {
        name: 'Dr. Priya Deshmukh',
        designation: 'Veterinary Physician & Feline Specialist',
        experience: '7+ years experience',
        degree: 'B.V.Sc & A.H (Bombay Veterinary College)',
        specialization: 'Feline Medicine & Dermatology',
        image: 'https://images.unsplash.com/photo-1594824813580-b742886f4a86?w=300&auto=format&fit=crop&q=80'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Anjali D.',
        rating: 5,
        date: '2 days ago',
        petType: 'Golden Retriever',
        verifiedPatient: true,
        comment: 'Dr. Sharma was incredibly patient with my anxious Golden Retriever. The clinic is spotless and they explained the treatment plan very clearly. Highly recommend.',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw3v8bDu58ubMy2ITJKCF24n812c-bQrnITysZ8D9FxpjVMPalhWy0GPHuKEOSM4MLJ-FhpaNCSSZWXpcoxGjzI_uolR6vFT-WwaY3pQ781VGOWD2zz3sBFRZk6vMACdP_uedmIzm0yKegKpIeqnkldP7GAK-Lvdcv8ITZ1n1qW7NzCJWzjm7oV-ly04vVc235alogmJU06Ljp13w4d5alQ_HaYPUvIJvx39JnmHLaNCGp0GHrzVSYCg'
      },
      {
        id: 'rev-2',
        author: 'Rahul M.',
        rating: 5,
        date: '1 week ago',
        petType: 'Indie Puppy',
        verifiedPatient: true,
        comment: 'Had a minor emergency late evening and they accommodated us immediately. Very professional staff and transparent pricing.'
      },
      {
        id: 'rev-3',
        author: 'Sunita Kapur',
        rating: 4.8,
        date: '3 weeks ago',
        petType: 'Persian Cat',
        verifiedPatient: true,
        comment: 'Dr. Priya is wonderful with cats. Usually, my cat freaks out at clinics, but the fear-free examination technique worked miracles.'
      }
    ],
    facilities: [
      'State-of-the-Art Operation Theatre',
      'Digital Radiography (X-Ray)',
      'High-Resolution Color Doppler Ultrasound',
      'Dedicated Cat-Only Waiting Area',
      'Oxygen Concentrators & ICU Cages',
      'Valet Parking Available'
    ],
    emergencyNote: 'For critical trauma, gastric dilation, or breathing distress, no prior appointment is required. Call ahead for faster OT prep.'
  },
  {
    id: 'advanced-pet-clinic-andheri',
    name: 'Advanced Pet Hospital & Trauma Center',
    tagline: '24/7 Multi-specialty tertiary care hospital with full ICU',
    type: 'Emergency Veterinary Care',
    category: 'emergency',
    location: 'Andheri West, Mumbai',
    address: 'Plot 42, Off Link Road, Behind Infinity Mall, Andheri West, Mumbai',
    landmark: 'Behind Infinity Mall',
    pincode: '400053',
    latitude: 19.1363,
    longitude: 72.8277,
    distance: 2.4,
    rating: 4.8,
    reviewCount: 164,
    phone: '+91 98199 11223',
    emergencyPhone: '+91 98199 11220',
    openingHours: 'Open 24 Hours / 7 Days a week',
    isOpenNow: true,
    emergencyAvailable: true,
    consultationFee: 900,
    services: [
      '24/7 Emergency & Critical Care',
      'Trauma Stabilization & Surgery',
      'In-house Blood Panel & Biochemistry',
      'Infectious Ward & Isolation',
      'Endoscopy & Laparoscopy',
      'Pet Ambulance Dispatch'
    ],
    species: ['Dogs', 'Cats', 'Birds', 'Exotics'],
    verified: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKuilBlti2Ca3xzR-w8NkQp3_yGfbcJeTvtL4Sq9Cw9_V6Bs9Wkh_wQ2lpBDQye-GTnUpiPBaR2VDmaymPLYzPWmyHjUfua2vjuvwXE-IKRqKrg1VHGT2GVfC_rAP_UJU41aDg9zXHy-hG_dq5v6lpZTCd7srX9e4pt9T2Ouy7WUvbEKS_TNzvDkNqaRZrgU3bzXBMYcN7WlVWXWk5RZfibK1zkKbQrcwXGH9zfYz9GccID-iaJNOctg',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsnljOz0Baq254fvf49wWXcp-_Pm1N8yQVIF9w6RHjBuZWahIQSPZ1VfN8z3KIYQsRwGjoFFXWNJspfoljepgSoKMoVp-i-xnnMm6dBwvFmzpnwkUXokQ55oTAIbHrZ4KgQwqo9OF04i7AxCwIAXr3XbMez0uE-0e17N3Avguo0Gc_YbNOEtSTeO1kHSvpTQIU7W07bg0M-hffc9hx0FZcceAgymHVlgUNISYgZKFRq90i0Bq4ge92bA',
    about: 'Advanced Pet Hospital is one of Mumbai’s largest comprehensive animal healthcare institutions, equipped with surgical suites, ventilators, rapid on-site pathology, and 24/7 senior resident veterinarians. We handle critical trauma, toxin ingestions, neonatal emergencies, and complex internal medicine cases.',
    doctors: [
      {
        name: 'Dr. Farhan Merchant',
        designation: 'Head of Emergency & Critical Care',
        experience: '15+ years experience',
        degree: 'M.V.Sc (Veterinary Medicine), Member IVECC',
        specialization: 'Emergency Resuscitation & Intensive Care'
      },
      {
        name: 'Dr. Shweta Rao',
        designation: 'Veterinary Radiologist & Ultrasonologist',
        experience: '9 years experience',
        degree: 'B.V.Sc, PG Diploma in Small Animal Radiology',
        specialization: 'Diagnostic Imaging'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Rohan Mehta',
        rating: 5,
        date: '3 days ago',
        petType: 'Labrador',
        verifiedPatient: true,
        comment: 'Saved my Lab who accidentally consumed dark chocolate at 2 AM. The night triage team moved with lightning speed and kept us updated.'
      },
      {
        id: 'rev-5',
        author: 'Farida Shaikh',
        rating: 4.7,
        date: '2 weeks ago',
        petType: 'Shih Tzu',
        verifiedPatient: true,
        comment: 'Very thorough testing. They got the CBC and serum biochemistry results in 25 minutes.'
      }
    ],
    facilities: [
      '24/7 Fully Staffed Emergency ICU',
      'Dedicated Blood Transfusion Unit',
      'Dual High-Sterility Operation Theatres',
      'Mechanical Ventilators & Oxygen Cages'
    ]
  },
  {
    id: 'dr-kavita-pet-care',
    name: "Dr. Kavita's Pet Care Clinic",
    tagline: 'Warm, personalized primary pet health & preventative wellness',
    type: 'Veterinarian',
    category: 'vet',
    location: 'Juhu, Mumbai',
    address: 'Gulmohar Cross Road 7, Near Juhu Circle, Mumbai',
    pincode: '400049',
    latitude: 19.1128,
    longitude: 72.8285,
    distance: 2.8,
    rating: 4.7,
    reviewCount: 94,
    phone: '+91 97690 33411',
    openingHours: '9:00 AM - 8:30 PM (Mon-Sat)',
    isOpenNow: true,
    closesAt: '8:30 PM today',
    emergencyAvailable: false,
    consultationFee: 700,
    services: [
      'General Checkup',
      'Puppy & Kitten Pediatric Care',
      'Vaccination & Deworming',
      'Nutritional Counseling',
      'Geriatric Pet Wellness',
      'Microchipping'
    ],
    species: ['Dogs', 'Cats', 'Rabbits'],
    verified: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4JxijIaSm_sN-I3Zm4aBsqt7S2QxXDwQqwQCc3N7I3D0ryoZEmxl_Ey1YgA0fR6DWY1SDqdSQfkU3wHsQ82LggtqIYbrSMy0ONTeZcMbt10VwylhFpHDEt2uJxJ8DPOkiikWkhkiBRBY-SQ4aDxVmeDLogDoVmxMqbko0hrvMNHcVrEPuTfwDAsLcBdv0rAPD4CiLS23soIX8K6q8IcPLD8sPzv8AcdWU3poY_Y1E3dNb-IXHBCuqUw',
    about: 'A boutique neighborhood clinic where Dr. Kavita Patel takes time to thoroughly examine your pet and explain preventative care. Known for minimal-wait appointments and stress-free handling.',
    doctors: [
      {
        name: 'Dr. Kavita Patel',
        designation: 'Senior Small Animal Practitioner',
        experience: '8 years experience',
        degree: 'B.V.Sc & A.H',
        specialization: 'Preventative Medicine & Dermatology'
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Varun Joshi',
        rating: 5,
        date: '5 days ago',
        petType: 'Beagle',
        verifiedPatient: true,
        comment: 'Dr. Kavita is gentle, observant, and answers all questions without rushing. Truly feels like a family doctor for pets.'
      }
    ],
    facilities: ['Consultation Room', 'Minor Procedure Room', 'Pharmacy & Nutritional Counter']
  },
  {
    id: 'mumbai-animal-hospital-colaba',
    name: 'Mumbai South Animal Hospital & Trauma',
    tagline: 'Historic multi-specialty animal care center with round-the-clock doctors',
    type: 'Emergency Veterinary Care',
    category: 'emergency',
    location: 'Colaba, South Mumbai',
    address: 'Near Sassoon Dock, Off SBS Road, Colaba, Mumbai',
    pincode: '400005',
    latitude: 18.9150,
    longitude: 72.8258,
    distance: 4.5,
    rating: 4.6,
    reviewCount: 210,
    phone: '+91 22 2284 9900',
    emergencyPhone: '+91 99200 44111',
    openingHours: 'Open 24 Hours',
    isOpenNow: true,
    emergencyAvailable: true,
    consultationFee: 750,
    services: [
      '24/7 Emergency Triage',
      'General Surgery',
      'X-Ray & Diagnostic Ultrasound',
      'Exotics & Avian Care',
      'Inpatient Hospitalization',
      'Vaccination'
    ],
    species: ['Dogs', 'Cats', 'Birds', 'Exotics', 'Community Animals'],
    verified: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNw_LF_XalDFmfrEwqTwmHHSVI_9ZSprbp-7g0H9SyWcFlauoQSlH16UKH5hJKEHnC2ypSBQYD7uJHVIQae7Mg2jWjvnSUQlpHhQRcvSQ0FV6RYhtx_FoMkugDqqwXyFnQu5pI5_HPxCn02gGMPl7cqiXL-Wlli0cYhJHxxVR92wS9wLy9MFvucyEmpFGJHPaPYFjszfILpCXH-WgI_B84nLK958cKBjrm60o6qVc-V0s5i3r9IIeOVA',
    about: 'Providing clinical care in South Mumbai for over 25 years. Features specialized treatment bays for exotic birds and pocket pets alongside advanced canine and feline medical wings.',
    doctors: [
      {
        name: 'Dr. Cyrus Batliwala',
        designation: 'Chief Veterinary Surgeon',
        experience: '20+ years experience',
        degree: 'M.V.Sc, F.A.V.A',
        specialization: 'Trauma & General Surgery'
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Siddharth Roy',
        rating: 5,
        date: '1 week ago',
        petType: 'Cockatiel',
        verifiedPatient: true,
        comment: 'One of the very few clinics in Mumbai that has true expertise in avian and bird care. Dr. Cyrus was exceptional.'
      }
    ],
    facilities: ['Avian Incubators', 'Digital Radiology', '24-Hour Pharmacy', 'Post-Op Recovery Ward']
  },
  {
    id: 'animal-relief-ngo-kurla',
    name: 'Animal Relief NGO & Sanctuary',
    tagline: 'Dedicated to rescue, rehabilitation, and finding forever homes for strays',
    type: 'NGO / Rescue',
    category: 'ngo',
    location: 'Kurla West, Mumbai',
    address: 'Near Phoenix Marketcity, LBS Marg, Kurla West, Mumbai',
    pincode: '400070',
    latitude: 19.0759,
    longitude: 72.8777,
    distance: 3.1,
    rating: 4.5,
    reviewCount: 89,
    phone: '+91 98200 66778',
    emergencyPhone: '+91 98200 66779',
    openingHours: 'Open 24 Hours for Rescue Inquiries',
    isOpenNow: true,
    emergencyAvailable: true,
    consultationFee: 300,
    services: [
      'Stray Animal Rescue',
      'Free / Subsidized Spay & Neuter (ABC)',
      'Adoption Coordination',
      'Community Feeder Support',
      'Wildlife Distress Rescue',
      'Sterilization Drives'
    ],
    species: ['Community Animals', 'Dogs', 'Cats', 'Birds'],
    verified: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_1cqSVHaN9vbmQpzTthuXMUowe1V6ZtBNmvfopLZnDtkjAvijDNijbiMNOOM1A_TUj23VnEDwIzco5sfxyYNnr97ZajodlEWrnneGnQFQxfLb6RoKDKI_YpOotELv2M3c-u6PVqvIj4-uFn3veOU5877MDp3Hp9Z0gCJ_-AC8dhzIWNfqwJ9ff1NQLkbzWR3a7V0rEvF7f25Th2z0zypdRM3LdXRKsjycWNZl80Fy6lJ0NJNYdJON3g',
    logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChISNcVoKMUXUKt6FSBnvvdXR9nZ7OGkv4Qv7yskwPMEtNvoaY_3leFjMDKwsePO5-xt23P81xmi3qA8KVHe2a6r8j_bIUWiAP2zqN2y15vBGPoKxI55KsHbaedUAP_55yrMlXFLGzqLp-0os02njEAV0WnkZvOCnCJkO7mzFCDrAPWLdE0q1XFh-yCGf1j-UgcYKSs8VUJsO5BbSvcFuPRjloD73ikpJshtprV4XfCQvzunA-s1wK0g',
    about: 'A registered non-profit working tirelessly across Mumbai to rescue injured strays, conduct humane animal birth control, and facilitate adoption of Indies into loving families.',
    doctors: [
      {
        name: 'Dr. Nilesh Kadam',
        designation: 'Resident ABC Surgeon & Welfare Officer',
        experience: '10 years experience',
        degree: 'B.V.Sc & A.H',
        specialization: 'Shelter Medicine & ABC Surgery'
      }
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'Kavita Sengupta',
        rating: 5,
        date: '4 days ago',
        petType: 'Indie Dog',
        verifiedPatient: true,
        comment: 'We adopted our sweet rescued Indie pup Bruno from here. They support you with vaccinations and guidance throughout.'
      }
    ],
    facilities: ['Recovery Kennels', 'Shelter Quarantine Bay', 'Outdoor Exercise Yard', 'Adoption Desk']
  },
  {
    id: 'happy-tails-boarding-powai',
    name: 'Happy Tails Luxury Boarding & Daycare',
    tagline: 'Premium cage-free boarding and day-care with 24/7 CCTV & vet on call',
    type: 'Boarding',
    category: 'boarding',
    location: 'Powai, Mumbai',
    address: 'Hiranandani Gardens, Central Avenue, Powai, Mumbai',
    pincode: '400076',
    latitude: 19.1176,
    longitude: 72.9060,
    distance: 5.2,
    rating: 4.9,
    reviewCount: 210,
    phone: '+91 98205 99881',
    openingHours: '7:00 AM - 8:00 PM (Guest check-in/out)',
    isOpenNow: true,
    closesAt: '8:00 PM today',
    emergencyAvailable: true,
    consultationFee: 1200,
    services: [
      'Overnight Pet Hotel Suites',
      'Daycare & Socialization',
      'Hydrotherapy & Swimming Pool',
      'Daily Live Video Stream Access',
      'Medication Administration',
      'Grooming & Spa'
    ],
    species: ['Dogs', 'Cats'],
    verified: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtPfoUlySKUIoI5If-ZJzrVZ_bJyqhBJpHO38aExl4xinvxHxSL23nFAaGkCJ4EyfJOeW_C7Fk3YfA1JwlvIpXmWnNqYnyYxbPWskvI20Ukrkz_syInFKSXdjXOLPln2SZs_mtIeR9ziuwH4rY5sHu50LQmD4kI9EX6eQYhjyDp_YXv-isVZvOoBD56gBzbkcM6iUBX8VqUj_SDsvcrO60PNSo_5dlv9_lb_dtq9Zp_jreRuLyfuRNeg',
    about: 'Mumbai’s top-rated pet resort featuring temperature-controlled private suites, non-slip rubberized indoor play arenas, a canine splash pool, and constant veterinary supervision.',
    doctors: [
      {
        name: 'Dr. Alisha Merchant',
        designation: 'Visiting Wellness Vet & Behavior Consultant',
        experience: '6 years experience',
        degree: 'B.V.Sc, Certified Canine Behaviorist',
        specialization: 'Pet Stress Management & Nutrition'
      }
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Samir Godbole',
        rating: 5,
        date: '2 weeks ago',
        petType: 'Golden Retriever',
        verifiedPatient: true,
        comment: 'Left my dog for 5 days while travelling abroad. The daily HD video updates and clean environment gave us complete peace of mind!'
      }
    ],
    facilities: ['Agility Grass Park', 'Individual AC Rooms', 'Veterinary On-Call Room', 'K9 Splash Pool']
  },
  {
    id: 'mumbai-animal-ambulance-service',
    name: 'Mumbai Rapid Pet & Wildlife Ambulance',
    tagline: 'Equipped emergency mobile clinic for rapid transit and on-site triage',
    type: 'Animal Ambulance',
    category: 'ambulance',
    location: 'Dadar / Central Mumbai',
    address: 'Near Shivaji Park, Dadar West, Mumbai',
    pincode: '400028',
    latitude: 19.0269,
    longitude: 72.8407,
    distance: 3.6,
    rating: 4.8,
    reviewCount: 142,
    phone: '+91 98210 55000',
    emergencyPhone: '+91 98210 55000',
    openingHours: '24/7 Mobile Dispatch Service',
    isOpenNow: true,
    emergencyAvailable: true,
    consultationFee: 600,
    services: [
      '24/7 Emergency Mobile Dispatch',
      'Oxygen Support in Transit',
      'Stretcher & Spinal Board Transport',
      'Accident & Roadside Triage',
      'Home Blood Collection',
      'Inter-Hospital Transfer'
    ],
    species: ['Dogs', 'Cats', 'Community Animals', 'Birds'],
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=800&auto=format&fit=crop&q=80',
    about: 'Dedicated animal ambulance network covering Western and Central Mumbai with custom-fitted vans, trained paramedics, oxygen lines, and emergency kits to transport critically ill animals safely.',
    doctors: [
      {
        name: 'Dr. Sameer Shinde',
        designation: 'Mobile Triage Lead',
        experience: '8 years experience',
        degree: 'B.V.Sc & A.H',
        specialization: 'Field Trauma & Emergency Resuscitation'
      }
    ],
    reviews: [
      {
        id: 'rev-10',
        author: 'Neelam Chawla',
        rating: 5,
        date: '3 weeks ago',
        comment: 'The ambulance arrived in 18 minutes when our Labrador collapsed. The paramedic administered oxygen in the van and transferred him safely to the hospital.'
      }
    ],
    facilities: ['Portable Oxygen Cylinders', 'Stretcher & Collapsible Crates', 'Vital Monitors', 'First Aid Kits']
  },
  {
    id: 'barking-buddies-vet-santacruz',
    name: 'Barking Buddies Animal Clinic',
    tagline: 'Modern feline & canine clinical care with in-house laboratory',
    type: 'Veterinary Clinic',
    category: 'vet',
    location: 'Santacruz West, Mumbai',
    address: 'Linking Road, Near Podar School, Santacruz West, Mumbai',
    pincode: '400054',
    latitude: 19.0805,
    longitude: 72.8368,
    distance: 1.8,
    rating: 4.7,
    reviewCount: 88,
    phone: '+91 98202 88440',
    openingHours: '9:00 AM - 9:00 PM',
    isOpenNow: true,
    closesAt: '9:00 PM today',
    emergencyAvailable: true,
    consultationFee: 750,
    services: [
      'General Medicine',
      'Dermatology & Allergy Testing',
      'Pet Dental Cleaning',
      'Vaccination Schedules',
      'Full CBC & Blood Biochemistry'
    ],
    species: ['Dogs', 'Cats'],
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop&q=80',
    about: 'A popular Santacruz clinic focused on dermatological diagnostics, allergy management, routine checkups, and gentle pediatric pet care.',
    doctors: [
      {
        name: 'Dr. Ananya Sen',
        designation: 'Veterinary Physician',
        experience: '9 years experience',
        degree: 'B.V.Sc & A.H, Cert. Vet Derm',
        specialization: 'Small Animal Dermatology'
      }
    ],
    reviews: [
      {
        id: 'rev-11',
        author: 'Gaurav K.',
        rating: 5,
        date: '1 month ago',
        petType: 'Pug',
        verifiedPatient: true,
        comment: 'Sorted out my Pug’s chronic skin allergy after 3 other vets had misdiagnosed it. Great diagnostic setup.'
      }
    ],
    facilities: ['Digital Skin Scrape Microscopy', 'Sterile Treatment Tables', 'In-house Pharmacy']
  },
  {
    id: 'feline-canine-cure-chembur',
    name: 'Cure & Care Animal Care Center',
    tagline: 'Comprehensive surgery, pet ultrasound, and cardiology clinic',
    type: 'Veterinary Clinic',
    category: 'vet',
    location: 'Chembur East, Mumbai',
    address: 'Near Diamond Garden, Central Avenue, Chembur, Mumbai',
    pincode: '400071',
    latitude: 19.0622,
    longitude: 72.8988,
    distance: 6.1,
    rating: 4.6,
    reviewCount: 76,
    phone: '+91 98209 11990',
    openingHours: '8:30 AM - 8:30 PM',
    isOpenNow: true,
    closesAt: '8:30 PM today',
    emergencyAvailable: false,
    consultationFee: 700,
    services: [
      'Cardiology & ECG',
      'Abdominal Ultrasound',
      'Soft Tissue Surgery',
      'Vaccinations',
      'Senior Pet Care'
    ],
    species: ['Dogs', 'Cats', 'Rabbits'],
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&auto=format&fit=crop&q=80',
    about: 'Serving Eastern Mumbai with diagnostic cardiology, abdominal ultrasounds, and geriatric care for aging pets.',
    doctors: [
      {
        name: 'Dr. Manish Kulkarni',
        designation: 'Veterinary Cardiologist & Surgeon',
        experience: '11 years experience',
        degree: 'M.V.Sc'
      }
    ],
    reviews: [
      {
        id: 'rev-12',
        author: 'Sneha Jain',
        rating: 4.8,
        date: '2 weeks ago',
        comment: 'Clear explanation of heart scans and gentle handling.'
      }
    ],
    facilities: ['Echocardiogram Machine', 'Digital X-Ray Suite', 'Pharmacy']
  },
  {
    id: 'paws-claws-ambulance-thane',
    name: 'Thane & Navi Mumbai Animal Ambulance',
    tagline: 'Rapid 24/7 rescue and hospital transport unit',
    type: 'Animal Ambulance',
    category: 'ambulance',
    location: 'Thane West, Mumbai MMR',
    address: 'Ghodbunder Road, Near Majiwada Junction, Thane West',
    pincode: '400601',
    latitude: 19.2183,
    longitude: 72.9781,
    distance: 12.4,
    rating: 4.7,
    reviewCount: 65,
    phone: '+91 99300 22110',
    emergencyPhone: '+91 99300 22110',
    openingHours: '24 Hours Emergency On Call',
    isOpenNow: true,
    emergencyAvailable: true,
    consultationFee: 500,
    services: [
      '24/7 Emergency Transport',
      'Oxygen Therapy On-Board',
      'Rescue for Stray Animals',
      'Large Dog Stretcher Service'
    ],
    species: ['Dogs', 'Cats', 'Community Animals'],
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=800&auto=format&fit=crop&q=80',
    about: 'Provides swift transport across Thane, Mulund, and Navi Mumbai to major trauma hospitals.',
    doctors: [],
    reviews: [
      {
        id: 'rev-13',
        author: 'Ravi Teja',
        rating: 5,
        date: '1 month ago',
        comment: 'Helped us transport our giant Saint Bernard who was unable to stand. The team handled him with great care.'
      }
    ],
    facilities: ['Hydraulic Stretcher', 'Oxygen Unit']
  }
];

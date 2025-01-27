Problem Statement:
Managing pet care routines, vet appointments, and pet supplies can be overwhelming for pet owners. They often forget important tasks like feeding, medication, or upcoming vet visits.

Solution:
The Pet Care Scheduler is a platform that helps pet owners manage care routines, track vet appointments, and maintain a supply inventory. It provides reminders for tasks and keeps track of all essential pet care activities in one place.


User Stories:
1. User Registration: As a user, I want to register on the platform using my email and password so that I can create an account.
2. Login: As a user, I want to log in to the platform so that I can access my pet's information.
3. Add Pet: As a user, I want to add my pet's details (name, breed, age) to the system so that I can manage its care.
4. Schedule Care Routine: As a user, I want to schedule daily routines (feeding, grooming, walks) for my pet so that I stay organized.
5. Add Vet Appointment: As a user, I want to add vet appointments with dates so that I don't forget them.
6. View Schedule: As a user, I want to see a calendar with all my scheduled routines and appointments.
7. Receive Notifications: As a user, I want to receive notifications for upcoming tasks and appointments.
8. Add Supplies: As a user, I want to track pet supplies like food, toys, and medicine so that I don't run out.
9. Update Pet Info: As a user, I want to update my pet’s information as needed (e.g., when it changes breed or age).
10. Delete Pet: As a user, I want to delete my pet's record from the system if I no longer need it.

Models:
1. User: user_id (PK), name, email (unique), password, is_verified
2. Pet: pet_id (PK), name, breed, age, user (ForeignKey to User)
3. Appointment: appointment_id (PK), pet (ForeignKey to Pet), appointment_date, type, status
4. Routine: routine_id (PK), pet (ForeignKey to Pet), routine_date, type
5. Supply: supply_id (PK), pet (ForeignKey to Pet), item, quantity

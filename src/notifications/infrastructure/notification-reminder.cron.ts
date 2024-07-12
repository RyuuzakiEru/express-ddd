import cron from 'node-cron';
import { ReservationRepository } from '../../reservation/domain/reservation.repository';
import { UserRepository } from '../../user/domain/user.repository';
import { USER_REPOSITORY } from '../../user/user.constants';
import { RESERVATION_REPOSITORY } from '../../reservation/reservation.constants';
import { SendEmailService } from '../application/send-email.service';
import { container } from '../../config/tsyringe.config';

export function scheduleNotificationReminders() {
  const userRepository = container.resolve<UserRepository>(USER_REPOSITORY);
  const reservationRepository = container.resolve<ReservationRepository>(RESERVATION_REPOSITORY);
  const sendEmailService = container.resolve(SendEmailService);

  cron.schedule(process.env.NOTIFICATION_REMINDERS_CRON!, async () => {
    try {
      const today = new Date();
      const twoDaysAhead = new Date();
      twoDaysAhead.setDate(today.getDate() + 2);
      const sevenDaysAfter = new Date();
      sevenDaysAfter.setDate(today.getDate() + 7);

      const reservationsDueSoon = await reservationRepository.findReservationsByDueDate(today, 2);
      for (const reservation of reservationsDueSoon) {
        const user = await userRepository.findById(reservation.userId.toString());
        if (user && user.email) {
          await sendEmailService.execute(
            user.email,
            'Reminder: Book Due Soon',
            `Your book is due on ${reservation.dueDate}`,
          );
        }
      }

      const overdueReservations = await reservationRepository.findReservationsByDueDate(today, -7);

      for (const reservation of overdueReservations) {
        const user = await userRepository.findById(reservation.userId.toString());
        if (user && user.email) {
          await sendEmailService.execute(
            user.email,
            'Reminder: Late Return',
            `Your book is overdue from ${reservation.dueDate}`,
          );
        }
      }

      console.log('Reminder emails sent successfully.');
    } catch (error) {
      console.error('Error sending reminder emails:', error);
    }
  });
}

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

public class EmailScheduler {
    public static void main(String[] args) {
        try {
            Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

            JobDetail job = JobBuilder.newJob(EmailJob.class)
                    .withIdentity("emailJob", "group")
                    .build();

            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("emailTrigger", "group")
                    .withSchedule(CronScheduleBuilder.dailyAtHourAndMinute(0, 0))  // Run every day at midnight
                    .build();

            scheduler.scheduleJob(job, trigger);
            scheduler.start();
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }
}

import { Component, OnInit } from "@angular/core";
import { LessonsService } from "../services/lessons.service";
import { Observable, of } from "rxjs";
import { Lesson } from "../model/lesson";
import { SwPush } from "@angular/service-worker";
import { NewsletterService } from "../services/newsletter.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: "lessons",
  templateUrl: "./lessons.component.html",
  styleUrls: ["./lessons.component.css"],
})
export class LessonsComponent implements OnInit {
  lessons$: Observable<Lesson[]>;
  isLoggedIn$: Observable<boolean>;
  sub: PushSubscription;

  readonly VAPID_PUBLIC_KEY =
    "BAqgNe-odlLiEQBthpI3XQj7BQ3lTSmqVhMlNL_NyH9mFkCRcrUpvADZPbO6RtJd1lVy2wN8r-GZfK3ssH1zQzk";

  constructor(
    private lessonsService: LessonsService,
    private newsletterService: NewsletterService,
    private swPush: SwPush
  ) {}

  ngOnInit() {
    this.loadLessons();
  }

  loadLessons() {
    this.lessons$ = this.lessonsService
      .loadAllLessons()
      .pipe(catchError((err) => of([])));
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        console.log("Notification Subscription:", sub);
        this.sub = sub;
        this.newsletterService.addPushSubscriber(sub).subscribe(
          (res) => {
            console.log("Sent push subscription to server: ", res);
          },
          (err) => {
            console.log("Failed to send push subscription to server: ", err);
          }
        );
      })
      .catch((err) =>
        console.error("Could not subscribe to notifications", err)
      );
  }

  sendNewsletter() {
    this.newsletterService.send().subscribe(
      (res) => {
        console.log("Newsletter sent: ", res);
      },
      (err) => {
        console.log("Failed to send newsletter: ", err);
      }
    );
  }
}

# strawbean-calendar-service

## what

This is a companion http api to [Strawbean](https://github.com/MaddyUnderStars/strawbean), which allows the functionality of the `/calendar` command.
It provides conversion from your Strawbean reminders to ICAL format, for importing into your preferred calendar program such as Google Calendar.
With Google Calendar ( and probably others ) you can import calendars from a URL, allowing your calendar to reflect your latest Strawbean reminders.

## how

```bash
git clone git@github.com:MaddyUnderStars/strawbean-calendar-service.git
cd strawbean-calendar-service
npm i
# create a .env file based on the .env.template file
tsc -b
node build/index.js
```

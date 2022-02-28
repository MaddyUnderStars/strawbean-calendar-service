import ical from "ical-generator";
import { Router } from "express";
import MongoStub from "../mongoStub";
import { ObjectID } from "bson";
const mongo = MongoStub.db;
const router = Router();

type Reminder = {
	_id: string | ObjectID;
	owner: string;
	name: string;
	description: string | null;
	time: number;
	channel: string;
	repeating: boolean | null;
	setTime: number;
	url: string;
	tag?: string;
};

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const usersColl = mongo!.collection("users");
		const user = await usersColl.findOne({ calendarToken: id });
		if (!user) return res.status(404);

		const remindersColl = mongo!.collection("reminders");
		const reminders = await (remindersColl.find({ owner: user._id })).toArray() as Reminder[];

		const calendar = ical();
		for (const reminder of reminders) {
			if (!reminder.time || !reminder.setTime) continue;

			calendar.createEvent({
				summary: reminder.name,
				description: reminder.description,
				url: reminder.url,
				categories: reminder.tag ? [{ name: reminder.tag }] : undefined,
				start: new Date(reminder.time),
				end: new Date(reminder.time + (30 * 1000)),
			});
		}

		calendar.serve(res);
	}
	catch (e) {
		return res.status(500);
	}
});

export default router;
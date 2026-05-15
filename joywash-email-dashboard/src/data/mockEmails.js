export const PRIORITY = {
  URGENT: "urgent",
  ACTION: "action",
  IMPORTANT: "important",
};

export const mockEmails = [
  {
    id: 1,
    priority: PRIORITY.URGENT,
    from: "healthinspector@citycouncil.gov",
    fromName: "City Health Inspector",
    subject: "URGENT: Failed inspection — closure notice",
    preview: "Your facility at 12 Main St has failed the quarterly sanitation inspection...",
    body: `Dear JoyWash Management,

Your facility at 12 Main St has failed the quarterly sanitation inspection conducted on May 14, 2026. The following violations were cited:

1. Chemical storage area improperly ventilated (Critical)
2. Drain blockage in bay 3 (Major)
3. Missing safety signage at entrance (Minor)

You have 48 hours to address critical violations or face mandatory closure. Please contact our office immediately to schedule a re-inspection.

Regards,
Health Inspector
City Council Office`,
    date: "2026-05-15T08:14:00",
    read: false,
    tags: ["compliance", "health"],
  },
  {
    id: 2,
    priority: PRIORITY.URGENT,
    from: "supplier@chemicalsdirect.com",
    fromName: "Chemicals Direct",
    subject: "Shipment delayed — soap stock critical",
    preview: "Due to a logistics disruption, your scheduled delivery of detergent concentrate has been...",
    body: `Hi JoyWash Team,

Due to a logistics disruption at our distribution centre, your scheduled delivery of detergent concentrate (Order #4481) has been delayed by 5–7 business days.

Current estimated delivery: May 22, 2026.

If you are running low, we recommend sourcing locally to avoid operational disruption. We sincerely apologise for the inconvenience and will issue a 10% credit on your next order.

Best,
Chemicals Direct Support`,
    date: "2026-05-15T07:45:00",
    read: false,
    tags: ["supplies", "operations"],
  },
  {
    id: 3,
    priority: PRIORITY.URGENT,
    from: "sarah.jones@hotmail.com",
    fromName: "Sarah Jones",
    subject: "Car damaged during wash — demanding compensation",
    preview: "I brought my 2024 Tesla Model 3 in for a full wash yesterday and your conveyor belt...",
    body: `To Whom It May Concern,

I brought my 2024 Tesla Model 3 in for a full wash on May 14 and your conveyor belt scratched the driver-side door panel. I have photos and the damage is significant.

I expect full compensation for the repair cost which I have been quoted at $850. If I do not hear back within 24 hours I will be filing a complaint with Consumer Affairs and leaving reviews on every platform.

Sarah Jones
Ph: 021 555 8823`,
    date: "2026-05-15T06:30:00",
    read: false,
    tags: ["complaint", "liability"],
  },
  {
    id: 4,
    priority: PRIORITY.ACTION,
    from: "anz.business@anz.co.nz",
    fromName: "ANZ Business Banking",
    subject: "Invoice overdue — account review triggered",
    preview: "Your business account has been flagged for review due to an overdue invoice payment...",
    body: `Dear JoyWash Ltd,

Your business account ending in 4412 has an overdue invoice payment of $3,200 (due May 1, 2026). An automatic account review has been triggered.

Please log in to ANZ Business Online or contact your relationship manager to arrange payment or a payment plan within 7 days to avoid further action.

ANZ Business Banking`,
    date: "2026-05-14T16:00:00",
    read: false,
    tags: ["finance", "banking"],
  },
  {
    id: 5,
    priority: PRIORITY.ACTION,
    from: "mike@staffagency.co.nz",
    fromName: "Mike Tane – Staff Agency",
    subject: "3 candidates ready to interview — please confirm",
    preview: "Following your request for two additional wash bay operators, we have shortlisted three...",
    body: `Hi JoyWash,

Following your job brief for two additional wash bay operators, we have shortlisted three candidates ready to interview this week:

1. James Parata – 3 years experience, available immediately
2. Lily Fong – 1 year experience, part-time preferred
3. Hemi Walker – 2 years experience, full-time

Please confirm your available interview slots by May 16 so we can proceed. Slots will be taken quickly.

Cheers,
Mike Tane
Staff Agency NZ`,
    date: "2026-05-14T14:22:00",
    read: true,
    tags: ["staffing", "hiring"],
  },
  {
    id: 6,
    priority: PRIORITY.ACTION,
    from: "council@aucklandcouncil.govt.nz",
    fromName: "Auckland Council",
    subject: "Resource consent renewal — response required by May 20",
    preview: "Your resource consent for commercial water usage at 12 Main St is due for renewal...",
    body: `Dear Applicant,

Your resource consent for commercial water usage (Consent No. RC-2021-4471) at 12 Main St expires on June 1, 2026. To continue operations without interruption, you must submit a renewal application by May 20, 2026.

Failure to apply by this date may result in operations being suspended pending review.

Documents required:
- Updated site plan
- Water usage log (last 12 months)
- Completed Form RC-7B

Auckland Council – Resource Consents`,
    date: "2026-05-13T10:00:00",
    read: true,
    tags: ["compliance", "council"],
  },
  {
    id: 7,
    priority: PRIORITY.ACTION,
    from: "pos.support@washtech.com",
    fromName: "WashTech POS Support",
    subject: "POS system update required — action needed",
    preview: "Version 4.1.2 of the WashTech POS system reaches end-of-life on June 1...",
    body: `Hi JoyWash,

WashTech POS version 4.1.2 reaches end-of-life on June 1, 2026 and will no longer receive security patches. We strongly recommend upgrading to v5.0 before this date.

The upgrade takes approximately 2 hours and should be scheduled outside peak hours. A technician can be booked at no charge if scheduled before May 25.

Book online or reply to this email to arrange.

WashTech Support Team`,
    date: "2026-05-12T09:30:00",
    read: false,
    tags: ["technology", "systems"],
  },
  {
    id: 8,
    priority: PRIORITY.IMPORTANT,
    from: "google-reviews@google.com",
    fromName: "Google Business",
    subject: "New 5-star review — JoyWash Main St",
    preview: 'You have received a new review: "Best car wash in town! Staff were super friendly..."',
    body: `JoyWash Main St has received a new Google review:

★★★★★ — Tom Williamson
"Best car wash in town! Staff were super friendly and the car came out spotless. Will definitely be back."

Posted: May 14, 2026

Tip: Responding to reviews helps build your reputation. Log in to Google Business Profile to reply.`,
    date: "2026-05-14T19:05:00",
    read: true,
    tags: ["marketing", "reviews"],
  },
  {
    id: 9,
    priority: PRIORITY.IMPORTANT,
    from: "nz.insurance@trademe.co.nz",
    fromName: "Business Shield Insurance",
    subject: "Renewal quote ready — business insurance due July 1",
    preview: "Your annual business insurance policy renews on July 1. We have prepared your renewal...",
    body: `Dear JoyWash,

Your Business Shield insurance policy (Policy #BSI-88412) renews on July 1, 2026. Your renewal quote is $4,890 (up 3.2% from last year).

No action is required before June 15, but we recommend reviewing your coverage to ensure it matches your current operations (especially if you have added new equipment or expanded services).

Contact your account manager to discuss.

Business Shield Insurance NZ`,
    date: "2026-05-13T11:00:00",
    read: true,
    tags: ["finance", "insurance"],
  },
  {
    id: 10,
    priority: PRIORITY.IMPORTANT,
    from: "franchise@joywash.co.nz",
    fromName: "JoyWash Head Office",
    subject: "Q2 franchise performance report enclosed",
    preview: "Please find attached your Q2 2026 franchise performance report. Key highlights include...",
    body: `Hi JoyWash Main St Team,

Please find enclosed your Q2 2026 franchise performance report.

Key highlights:
- Revenue: $148,200 (↑ 8% vs Q1)
- Customer visits: 3,840 (↑ 5%)
- NPS score: 72 (franchise average: 65)
- Loyalty memberships sold: 142

You are tracking above average across all metrics. Well done to your team.

The report includes recommendations for upselling premium packages in Q3. Please review before the regional manager call on June 3.

JoyWash Head Office`,
    date: "2026-05-12T08:00:00",
    read: true,
    tags: ["franchise", "performance"],
  },
  {
    id: 11,
    priority: PRIORITY.IMPORTANT,
    from: "events@localbusiness.org.nz",
    fromName: "Local Business Network",
    subject: "Networking event — June 5, register by May 28",
    preview: "Join us for the quarterly Local Business Network mixer on June 5 at the Harbour View...",
    body: `Hi JoyWash,

Join us for the Q2 Local Business Network mixer:

Date: June 5, 2026
Time: 5:30 PM – 7:30 PM
Venue: Harbour View Function Centre

Registration closes May 28. Spots are limited.

This quarter's theme is "Customer Retention Strategies" with guest speaker Dr. Aroha Ngata.

Register at localbusiness.org.nz or reply to this email.

Local Business Network`,
    date: "2026-05-11T14:00:00",
    read: false,
    tags: ["networking", "events"],
  },
];

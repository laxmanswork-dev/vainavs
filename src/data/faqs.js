/** Frequently asked questions — currently unused (not rendered by any
 * page). Was "shown on the Contact/Reservations pages" per this file's own
 * original comment; the Reservations page/route no longer exists (removed
 * entirely, see routes/AppRoutes.jsx), and neither page ever actually
 * imported this list. Left as-is otherwise — the FAQ content itself
 * (including the walk-in/reservation question below) is still accurate
 * real-world info about the café, not a reference to the removed page. */
export const FAQS = [
  {
    question: 'What are your opening hours?',
    answer: "We're open every day, Monday through Sunday, from 10:00 AM to 11:00 PM.",
  },
  {
    question: 'Do I need a reservation, or can I walk in?',
    answer:
      'Walk-ins are always welcome. For groups of 6 or more, or for weekend evenings, we recommend booking a table ahead of time.',
  },
  {
    question: 'Do you take large group or event bookings?',
    answer:
      "Yes — for birthdays, celebrations or larger group bookings, call or WhatsApp us in advance and we'll set up a table that fits.",
  },
  {
    question: 'Is there vegetarian food on the menu?',
    answer:
      'Yes, a large part of our menu — wraps, noodles, desserts and our full coffee list — is vegetarian. Ask your server for vegan options too.',
  },
  {
    question: 'Do you offer takeaway or delivery?',
    answer:
      'Takeaway is available at the counter. For delivery, call us directly or check our listing on your preferred delivery app.',
  },
  {
    question: "Is Vainav's kid-friendly?",
    answer:
      'Absolutely — we welcome families, and our menu has plenty of options kids love, from shakes to loaded fries.',
  },
  {
    question: 'Do you have wifi and parking?',
    answer: 'Yes to both — free wifi throughout the café, and parking available right outside.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, all major cards and UPI payments.',
  },
]

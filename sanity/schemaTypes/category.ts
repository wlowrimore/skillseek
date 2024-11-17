export const category = {
  name: "category",
  title: "Service Category",
  type: "string",
  options: {
    list: [
      { title: "Home Improvement", value: "Home Improvement" },
      { title: "Lawn & Garden", value: "Lawn & Garden" },
      {
        title: "Automotive Maintenance & Repair",
        value: "Automotive Maintenance & Repair",
      },
      {
        title: "Small Engine Maintenance & Repair",
        value: "Small Engine Maintenance & Repair",
      },
      { title: "Child Care", value: "Child Care" },
      { title: "Pet Care", value: "Pet Care" },
      { title: "Education & Tutoring", value: "Education & Tutoring" },
      { title: "Music & Arts Lessons", value: "Music & Arts Lessons" },
      { title: "Music Services", value: "Music Services" },
      { title: "Wedding | Party Planning", value: "Wedding | Party Planning" },
      { title: "Legal Services", value: "Legal Services" },
      { title: "Financial Advice", value: "Financial Advice" },
      { title: "Electronics Repair", value: "Electronics Repair" },
      { title: "Transportation | Carpool", value: "Transportation | Carpool" },
      { title: "Housekeeping", value: "Housekeeping" },
      {
        title: "Website & Software Services",
        value: "Website & Software Services",
      },
      { title: "Plumbing", value: "Plumbing" },
      {
        title: "Electrical Maintenance & Repair",
        value: "Electrical Maintenance & Repair",
      },
      { title: "HVAC Heating & Cooling", value: "HVAC Heating & Cooling" },
      { title: "Pool Maintenance", value: "Pool Maintenance" },
    ],
  },
  validation: (Rule: any) => Rule.required(),
};

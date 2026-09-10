import { IMG, CONTACT } from "@/lib/data";
import { PageHero, Reveal } from "@/components/site/Shared";

export interface LegalSection {
  heading: string;
  body: string[];
}

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "1. Who We Are",
    body: [
      "Pushpalata Infratech Private Limited (\u201cPushpalata Infratech\u201d, \u201cwe\u201d, \u201cus\u201d) is a transmission-line construction and EPC execution company incorporated on 12 March 2014, with its registered office at Sonadhia, 197, Mahadipur, Pasraha, Khagaria, Bihar \u2013 851212, India.",
    ],
  },
  {
    heading: "2. Information We Collect",
    body: [
      "When you submit the project enquiry form on this website, we collect the details you provide: your name, company name, email address, phone number, project type, project location, approximate requirement and message.",
      "We do not collect payment information, government identity numbers, or any sensitive personal data through this website.",
    ],
  },
  {
    heading: "3. How We Use Your Information",
    body: [
      "Enquiry details are used solely to respond to your project enquiry, prepare scope discussions, and communicate with you about our services.",
      "We may contact you by phone, WhatsApp or email using the details you provide.",
    ],
  },
  {
    heading: "4. Sharing of Information",
    body: [
      "We do not sell, rent or trade your personal information to third parties. Information may be shared internally with our project and management teams only for the purpose of responding to your enquiry.",
    ],
  },
  {
    heading: "5. Data Retention & Security",
    body: [
      "Enquiry records are retained for as long as needed to serve the business purpose for which they were collected, and are stored with reasonable technical safeguards.",
    ],
  },
  {
    heading: "6. Your Choices",
    body: [
      `You may request correction or deletion of your submitted information at any time by writing to ${CONTACT.email} or calling ${CONTACT.phone1}.`,
    ],
  },
  {
    heading: "7. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The updated version will be published on this page.",
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "1. About This Website",
    body: [
      "This website is the official corporate website of Pushpalata Infratech Private Limited. It provides general information about the company, its transmission-line execution experience, services and current EPC capabilities.",
    ],
  },
  {
    heading: "2. Accuracy of Content",
    body: [
      "Project experience described as \u201cSubcontractor\u201d or \u201cExecution Partner\u201d reflects historical subcontract execution roles and is not represented as direct EPC contracting. Figures marked with an asterisk (*) are management-provided figures.",
      "While we take care to keep information accurate, content on this website is general in nature and does not constitute a technical offer, quotation or contractual commitment. Project-specific scope, quantities and credentials are confirmed formally during the tendering or negotiation process.",
    ],
  },
  {
    heading: "3. Intellectual Property",
    body: [
      "All text, design, logos and layout of this website are the property of Pushpalata Infratech Private Limited and may not be reproduced without written permission. Third-party organization names are referenced solely to describe documented project engagement roles.",
    ],
  },
  {
    heading: "4. Enquiries",
    body: [
      "Submitting the enquiry form does not create a contractual relationship. Any engagement is subject to formal written agreement between the parties.",
    ],
  },
  {
    heading: "5. Limitation of Liability",
    body: [
      "Pushpalata Infratech Private Limited is not liable for any indirect or consequential loss arising from the use of, or reliance on, information published on this website.",
    ],
  },
  {
    heading: "6. Governing Law",
    body: [
      "These terms are governed by the laws of India. Courts at Khagaria, Bihar shall have jurisdiction over any dispute arising from the use of this website.",
    ],
  },
  {
    heading: "7. Contact",
    body: [
      `For questions about these terms, write to ${CONTACT.email} or call ${CONTACT.phone1}.`,
    ],
  },
];

export default function LegalPage({
  eyebrow,
  title,
  sections,
  testId,
}: {
  eyebrow: string;
  title: string;
  sections: LegalSection[];
  testId: string;
}) {
  return (
    <main data-testid={testId}>
      <PageHero eyebrow={eyebrow} title={title} img={IMG.lattice} />
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={Math.min(i * 0.05, 0.3)}>
              <div className="rounded-2xl border border-ink/10 bg-white p-8">
                <h2 className="font-heading text-lg font-extrabold uppercase tracking-tight text-ink">
                  {s.heading}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-ink/65">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Pushpalata Infratech Private Limited • {CONTACT.website}
        </p>
      </section>
    </main>
  );
}

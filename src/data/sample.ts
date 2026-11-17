/**
 * Demo content. Every figure here is generated for the sample workspace and is
 * shown with SAMPLE_NOTE next to it. Replace with real data before launch.
 */
export const SAMPLE_NOTE =
  "Sample workspace. Figures are generated for this demo.";

export type Stat = { label: string; value: string };

export const stats: Stat[] = [
  { label: "Alerts in, last 24 hours", value: "18,402" },
  { label: "Reached an analyst", value: "37" },
  { label: "Median time to root cause", value: "4 min 12 s" },
  { label: "Sources connected", value: "23" },
];

export type Source = { id: string; label: string; detail: string; events: number };

export const sources: Source[] = [
  { id: "identity", label: "Identity", detail: "Sign-ins, token grants, role changes", events: 6120 },
  { id: "cloud", label: "Cloud control plane", detail: "API calls, storage access, new keys", events: 5884 },
  { id: "endpoint", label: "Endpoint", detail: "Process starts, file writes, installs", events: 4310 },
  { id: "network", label: "Network", detail: "Outbound flows, DNS, new hosts", events: 2088 },
];

export type TraceEvent = { t: number; label: string; detail: string; source: string };

export const traceEvents: TraceEvent[] = [
  { t: 0, label: "Sign-in from a new country", detail: "Valid password, no prior history from this region", source: "Identity" },
  { t: 6, label: "Token granted to an unfamiliar app", detail: "Mail and file scopes approved in one prompt", source: "Identity" },
  { t: 11, label: "Mailbox rule created", detail: "Replies from finance moved to a hidden folder", source: "Identity" },
  { t: 19, label: "Storage buckets listed", detail: "Same token, first time it touched the cloud account", source: "Cloud" },
  { t: 27, label: "Bulk read of 41 objects", detail: "Finance exports folder, read in under a minute", source: "Cloud" },
  { t: 33, label: "Outbound transfer to a new host", detail: "1.8 GB to an address no one has used before", source: "Network" },
  { t: 41, label: "Alert raised", detail: "Traced back to the 14:00 sign-in as the root cause", source: "Vigil" },
];

export type ChangeGroup = { title: string; items: { text: string; ref: string }[] };

export const changeGroups: ChangeGroup[] = [
  {
    title: "New",
    items: [
      { text: "Contractor token reading a finance bucket", ref: "Case 214" },
      { text: "Impossible-travel sign-in across two regions", ref: "Case 214" },
    ],
  },
  {
    title: "Escalated",
    items: [{ text: "Mailbox rule hiding replies from finance", ref: "Case 213 to 214" }],
  },
  {
    title: "Closed as benign",
    items: [
      { text: "Burst of failed logins from a stale script", ref: "Case 210" },
      { text: "Scanner traffic from a known vendor", ref: "Case 211" },
    ],
  },
];

export type LogRow = {
  id: string;
  opened: string;
  source: string;
  cause: string;
  time: string;
  verdict: "Real threat" | "Benign";
};

export const logRows: LogRow[] = [
  { id: "214", opened: "Tue 09:12", source: "Identity", cause: "Stolen session token", time: "3 min 40 s", verdict: "Real threat" },
  { id: "213", opened: "Mon 17:48", source: "Cloud", cause: "Misconfigured test role", time: "6 min 05 s", verdict: "Benign" },
  { id: "212", opened: "Mon 11:03", source: "Endpoint", cause: "Unsigned updater", time: "2 min 51 s", verdict: "Benign" },
  { id: "211", opened: "Sun 22:30", source: "Network", cause: "Scanner from a known vendor", time: "1 min 19 s", verdict: "Benign" },
  { id: "210", opened: "Sun 03:14", source: "Identity", cause: "Stale script, failed logins", time: "4 min 02 s", verdict: "Benign" },
];

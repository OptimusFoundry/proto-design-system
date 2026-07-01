// Showcase-only "in context" compositions: real components assembled into
// believable product surfaces, proving the kit composes — not just renders in
// isolation. Imported solely by UIKit.stories.tsx (tree-shaken from the app).

import {
	Activity,
	ArrowUpRight,
	KeyRound,
	Lock,
	Mail,
	TrendingUp,
	Users,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { StatCard } from "../components/data/StatCard/StatCard";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/data/Table/Table";
import { Progress } from "../components/feedback/Progress/Progress";
import { Toast } from "../components/feedback/Toast/Toast";
import { Checkbox } from "../components/forms/Checkbox/Checkbox";
import { Select } from "../components/forms/Select/Select";
import { Slider } from "../components/forms/Slider/Slider";
import { Switch } from "../components/forms/Switch/Switch";
import { TextField } from "../components/forms/TextField/TextField";
import { Card } from "../components/layout/Card/Card";
import { Divider } from "../components/layout/Divider/Divider";
import { Avatar } from "../components/primitives/Avatar/Avatar";
import { Badge } from "../components/primitives/Badge/Badge";
import { Button } from "../components/primitives/Button/Button";
import { Text } from "../components/primitives/Text/Text";
import styles from "./Compositions.module.scss";

interface PanelProps {
	caption: string;
	children: ReactNode;
	wide?: boolean;
}

function Panel({ caption, children, wide }: PanelProps) {
	return (
		<figure className={styles.panel} data-wide={wide || undefined}>
			<figcaption className={styles.caption}>{caption}</figcaption>
			{children}
		</figure>
	);
}

function AnalyticsPanel() {
	return (
		<Card variant="elevated" padding="lg">
			<div className={styles.cardHead}>
				<div>
					<Text size="lg" weight="semibold">
						Revenue overview
					</Text>
					<Text size="sm" color="muted">
						Last 30 days
					</Text>
				</div>
				<Badge variant="success" dot>
					Live
				</Badge>
			</div>

			<div className={styles.statRow}>
				<StatCard
					label="MRR"
					value="$48.2k"
					trend="up"
					trendValue="+12%"
					icon={<TrendingUp />}
				/>
				<StatCard
					label="Active users"
					value="2,350"
					trend="up"
					trendValue="+8%"
					icon={<Users />}
				/>
				<StatCard
					label="Churn"
					value="1.4%"
					trend="down"
					trendValue="-0.3%"
					icon={<Activity />}
				/>
			</div>

			<div className={styles.progressBlock}>
				<div className={styles.progressLabel}>
					<Text size="sm" color="muted">
						Quarterly goal
					</Text>
					<Text size="sm" weight="medium">
						72%
					</Text>
				</div>
				<Progress value={72} aria-label="Quarterly goal" />
			</div>

			<Table size="sm">
				<TableHeader>
					<TableRow>
						<TableHead>Customer</TableHead>
						<TableHead>Plan</TableHead>
						<TableHead>MRR</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Acme Inc.</TableCell>
						<TableCell>
							<Badge variant="primary">Scale</Badge>
						</TableCell>
						<TableCell>$1,200</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Globex</TableCell>
						<TableCell>
							<Badge>Growth</Badge>
						</TableCell>
						<TableCell>$540</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Soylent</TableCell>
						<TableCell>
							<Badge variant="outline">Starter</Badge>
						</TableCell>
						<TableCell>$120</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</Card>
	);
}

function AuthPanel() {
	return (
		<Card variant="elevated" padding="lg">
			<div className={styles.authHead}>
				<Text as="h3" size="xl" weight="semibold">
					Welcome back
				</Text>
				<Text size="sm" color="muted">
					Sign in to your workspace to continue.
				</Text>
			</div>

			<div className={styles.fieldStack}>
				<TextField
					label="Email"
					type="email"
					placeholder="you@company.com"
					leftElement={<Mail />}
				/>
				<TextField
					label="Password"
					type="password"
					placeholder="••••••••"
					leftElement={<Lock />}
				/>
				<div className={styles.authRow}>
					<Checkbox label="Remember me" />
					<Button variant="ghost" size="sm">
						Forgot password?
					</Button>
				</div>
				<Button variant="primary" isFullWidth>
					Sign in
				</Button>
				<Divider>or</Divider>
				<Button variant="outline" isFullWidth leftIcon={<KeyRound />}>
					Continue with SSO
				</Button>
			</div>
		</Card>
	);
}

function SettingsPanel() {
	const [volume, setVolume] = useState("60");
	return (
		<Card variant="elevated" padding="lg">
			<div className={styles.cardHead}>
				<div className={styles.teamHead}>
					<Avatar initials="JD" />
					<div>
						<Text size="md" weight="semibold">
							Jamie Doe
						</Text>
						<Text size="sm" color="muted">
							Workspace settings
						</Text>
					</div>
				</div>
				<Button variant="ghost" size="sm" rightIcon={<ArrowUpRight />}>
					Profile
				</Button>
			</div>

			<div className={styles.fieldStack}>
				<Switch
					label="Email notifications"
					description="Product updates and weekly digests"
					defaultChecked
				/>
				<Switch
					label="Two-factor authentication"
					description="Require a code at every sign-in"
				/>
				<Select
					label="Digest frequency"
					defaultValue="weekly"
					options={[
						{ value: "daily", label: "Daily" },
						{ value: "weekly", label: "Weekly" },
						{ value: "monthly", label: "Monthly" },
					]}
				/>
				<Slider
					label="Notification volume"
					value={volume}
					onChange={(e) => setVolume(e.target.value)}
				/>
			</div>

			<Toast variant="success" title="Settings saved">
				Your preferences are up to date.
			</Toast>

			<div className={styles.actions}>
				<Button variant="ghost">Cancel</Button>
				<Button variant="primary">Save changes</Button>
			</div>
		</Card>
	);
}

export function Compositions() {
	return (
		<div className={styles.grid}>
			<Panel caption="Analytics dashboard" wide>
				<AnalyticsPanel />
			</Panel>
			<Panel caption="Authentication">
				<AuthPanel />
			</Panel>
			<Panel caption="Account settings">
				<SettingsPanel />
			</Panel>
		</div>
	);
}

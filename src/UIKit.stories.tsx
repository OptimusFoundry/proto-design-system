// MAINTENANCE: when adding a new component to proto-design-system/components,
// add a single <Cell /> row in the matching <Section /> below. No registry —
// this list is intentionally manual so reviewers can see coverage at a glance.

import type { Meta, StoryObj } from "@storybook/react";
import { Code, Home, Mail, Search, Users } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Accordion } from "./components/composite/Accordion/Accordion";
import { DatePicker } from "./components/composite/DatePicker/DatePicker";
import {
	FileUpload,
	type UploadedFile,
} from "./components/composite/FileUpload/FileUpload";
import { MultiSelect } from "./components/composite/MultiSelect/MultiSelect";
import { EmptyState } from "./components/data/EmptyState/EmptyState";
import { FilterTabs } from "./components/data/FilterTabs/FilterTabs";
import { List, ListItem } from "./components/data/List/List";
import { StatCard } from "./components/data/StatCard/StatCard";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./components/data/Table/Table";
import { Alert } from "./components/feedback/Alert/Alert";
import { Banner } from "./components/feedback/Banner/Banner";
import {
	BannerCenterProvider,
	useBannerCenter,
} from "./components/feedback/BannerCenter/BannerCenter";
import { Progress } from "./components/feedback/Progress/Progress";
import { Toast } from "./components/feedback/Toast/Toast";
import { Checkbox } from "./components/forms/Checkbox/Checkbox";
import { FormField } from "./components/forms/FormField/FormField";
import { FormHint } from "./components/forms/FormHint/FormHint";
import { Input } from "./components/forms/Input/Input";
import { Label } from "./components/forms/Label/Label";
import { Radio } from "./components/forms/Radio/Radio";
import { Select } from "./components/forms/Select/Select";
import { Slider } from "./components/forms/Slider/Slider";
import { Stepper } from "./components/forms/Stepper/Stepper";
import { Switch } from "./components/forms/Switch/Switch";
import { TextArea } from "./components/forms/TextArea/TextArea";
import { TextField } from "./components/forms/TextField/TextField";
import { AspectRatio } from "./components/layout/AspectRatio/AspectRatio";
import { Card } from "./components/layout/Card/Card";
import { Container } from "./components/layout/Container/Container";
import { Divider } from "./components/layout/Divider/Divider";
import { Grid } from "./components/layout/Grid/Grid";
import { Stack } from "./components/layout/Stack/Stack";
import { Breadcrumb } from "./components/navigation/Breadcrumb/Breadcrumb";
import { Pagination } from "./components/navigation/Pagination/Pagination";
import { StepIndicator } from "./components/navigation/StepIndicator/StepIndicator";
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "./components/navigation/Tabs/Tabs";
import { Dropdown } from "./components/overlays/Dropdown/Dropdown";
import { DropdownMenu } from "./components/overlays/DropdownMenu/DropdownMenu";
import { Popover } from "./components/overlays/Popover/Popover";
import { Tooltip } from "./components/overlays/Tooltip/Tooltip";
import { Avatar } from "./components/primitives/Avatar/Avatar";
import { Badge } from "./components/primitives/Badge/Badge";
import { Button } from "./components/primitives/Button/Button";
import { Icon } from "./components/primitives/Icon/Icon";
import { Skeleton } from "./components/primitives/Skeleton/Skeleton";
import { Spinner } from "./components/primitives/Spinner/Spinner";
import { Tag } from "./components/primitives/Tag/Tag";
import { Text } from "./components/primitives/Text/Text";
import styles from "./UIKit.module.scss";

// biome-ignore lint/suspicious/noEmptyBlockStatements: intentional noop for "see story" placeholder buttons
function noop() {}

type CellProps = {
	name: string;
	children: ReactNode;
};

function Cell({ name, children }: CellProps) {
	return (
		<div className={styles.cell}>
			<span className={styles.label}>{name}</span>
			<div className={styles.demo}>{children}</div>
		</div>
	);
}

type SectionProps = {
	title: string;
	children: ReactNode;
};

function Section({ title, children }: SectionProps) {
	return (
		<section className={styles.section}>
			<h2 className={styles.heading}>{title}</h2>
			<div className={styles.grid}>{children}</div>
		</section>
	);
}

function BannerCenterDemo() {
	const { addBanner } = useBannerCenter();
	return (
		<Button
			size="sm"
			onClick={() =>
				addBanner({
					type: "info",
					title: "Info banner",
					description: "A sample banner.",
				})
			}
		>
			Add banner
		</Button>
	);
}

function UIKit() {
	const [sliderVal, setSliderVal] = useState("50");
	const [stepperVal, setStepperVal] = useState(1);
	const [datepickerVal, setDatepickerVal] = useState<Date | null>(null);
	const [files, setFiles] = useState<UploadedFile[]>([]);
	const [multiVal, setMultiVal] = useState<Set<string>>(new Set());
	const [dropdownVal, setDropdownVal] = useState<string | undefined>();
	const [filterTab, setFilterTab] = useState("all");
	const [page, setPage] = useState(1);

	return (
		<div className={styles.poster}>
			{/* 1. Primitives */}
			<Section title="Primitives">
				<Cell name="Avatar">
					<Avatar initials="JD" />
				</Cell>
				<Cell name="Badge">
					<Badge variant="primary">Badge</Badge>
				</Cell>
				<Cell name="Button">
					<Button variant="primary">Button</Button>
				</Cell>
				<Cell name="Icon">
					<Icon icon={Home} size="lg" />
				</Cell>
				<Cell name="Skeleton">
					<Skeleton width={120} />
				</Cell>
				<Cell name="Spinner">
					<Spinner />
				</Cell>
				<Cell name="Tag">
					<Tag variant="primary">Tag</Tag>
				</Cell>
				<Cell name="Text">
					<Text>Sample text</Text>
				</Cell>
			</Section>

			{/* 2. Forms */}
			<Section title="Forms">
				<Cell name="Checkbox">
					<Checkbox label="Accept terms" />
				</Cell>
				<Cell name="FormField">
					<FormField label="Email">
						<Input placeholder="you@example.com" />
					</FormField>
				</Cell>
				<Cell name="FormHint">
					<FormHint>Helper text here.</FormHint>
				</Cell>
				<Cell name="Input">
					<Input placeholder="Enter text…" />
				</Cell>
				<Cell name="Label">
					<Label htmlFor="demo-label">Label</Label>
				</Cell>
				<Cell name="Radio">
					<Radio label="Option A" name="demo-radio" />
				</Cell>
				<Cell name="Select">
					<Select
						options={[
							{ value: "a", label: "Option A" },
							{ value: "b", label: "Option B" },
						]}
						placeholder="Select…"
					/>
				</Cell>
				<Cell name="Slider">
					<Slider
						value={sliderVal}
						onChange={(e) => setSliderVal(e.target.value)}
						label="Volume"
					/>
				</Cell>
				<Cell name="Stepper">
					<Stepper
						value={stepperVal}
						onChange={setStepperVal}
						min={0}
						max={10}
						aria-label="Quantity"
					/>
				</Cell>
				<Cell name="Switch">
					<Switch label="Dark mode" />
				</Cell>
				<Cell name="TextArea">
					<TextArea label="Notes" placeholder="Enter notes…" />
				</Cell>
				<Cell name="TextField">
					<TextField label="Username" placeholder="Enter username" />
				</Cell>
			</Section>

			{/* 3. Feedback */}
			<Section title="Feedback">
				<Cell name="Alert">
					<Alert variant="info" title="Info">
						This is an info alert.
					</Alert>
				</Cell>
				<Cell name="Banner">
					<Banner
						type="success"
						variant="light"
						title="Saved"
						description="Changes saved successfully."
					/>
				</Cell>
				<Cell name="BannerCenter">
					<BannerCenterProvider>
						<BannerCenterDemo />
					</BannerCenterProvider>
				</Cell>
				<Cell name="Progress">
					<Progress value={65} showLabel />
				</Cell>
				<Cell name="Toast">
					<Toast variant="success" title="Saved">
						Your changes have been saved.
					</Toast>
				</Cell>
			</Section>

			{/* 4. Overlays */}
			<Section title="Overlays">
				<Cell name="Drawer">
					<Button onClick={noop}>Open drawer (see story)</Button>
				</Cell>
				<Cell name="Dropdown">
					<Dropdown
						items={[
							{ id: "edit", label: "Edit" },
							{ id: "delete", label: "Delete", danger: true },
						]}
						value={dropdownVal}
						onChange={setDropdownVal}
						placeholder="Select…"
					/>
				</Cell>
				<Cell name="DropdownMenu">
					<DropdownMenu
						items={[
							{ id: "1", label: "Edit" },
							{ id: "2", label: "Delete" },
						]}
					/>
				</Cell>
				<Cell name="Modal">
					<Button onClick={noop}>Open modal (see story)</Button>
				</Cell>
				<Cell name="Popover">
					<Popover trigger={<Button size="sm">Open</Button>} placement="bottom">
						<Text size="sm">Popover content.</Text>
					</Popover>
				</Cell>
				<Cell name="Tooltip">
					<Tooltip content="Helpful tooltip" position="top">
						<Button size="sm" variant="outline">
							Hover me
						</Button>
					</Tooltip>
				</Cell>
			</Section>

			{/* 5. Navigation */}
			<Section title="Navigation">
				<Cell name="Breadcrumb">
					<Breadcrumb
						items={[
							{ label: "Home", href: "/" },
							{ label: "Settings", href: "/settings" },
							{ label: "Profile" },
						]}
					/>
				</Cell>
				<Cell name="CommandPalette">
					<Button onClick={noop}>Open palette (see story)</Button>
				</Cell>
				<Cell name="Navbar">
					<Button onClick={noop}>Navbar (see story)</Button>
				</Cell>
				<Cell name="Pagination">
					<Pagination page={page} totalPages={5} onPageChange={setPage} />
				</Cell>
				<Cell name="Sidebar">
					<Button onClick={noop}>Sidebar (see story)</Button>
				</Cell>
				<Cell name="StepIndicator">
					<StepIndicator
						steps={[
							{ id: "1", label: "Account" },
							{ id: "2", label: "Profile" },
							{ id: "3", label: "Done" },
						]}
						currentStep={1}
					/>
				</Cell>
				<Cell name="Tabs">
					<Tabs defaultTab="t1">
						<TabList aria-label="Demo tabs">
							<Tab id="t1">One</Tab>
							<Tab id="t2">Two</Tab>
						</TabList>
						<TabPanels>
							<TabPanel id="t1">Content 1</TabPanel>
							<TabPanel id="t2">Content 2</TabPanel>
						</TabPanels>
					</Tabs>
				</Cell>
			</Section>

			{/* 6. Composite */}
			<Section title="Composite">
				<Cell name="Accordion">
					<Accordion
						items={[
							{ id: "1", title: "What is this?", content: "A design system." },
							{
								id: "2",
								title: "How do I use it?",
								content: "Import and use.",
							},
						]}
					/>
				</Cell>
				<Cell name="DatePicker">
					<DatePicker
						value={datepickerVal}
						onChange={setDatepickerVal}
						placeholder="Pick a date…"
					/>
				</Cell>
				<Cell name="FileUpload">
					<FileUpload
						files={files}
						onFilesChange={setFiles}
						label="Drop files here"
						description="or click to browse"
					/>
				</Cell>
				<Cell name="MultiSelect">
					<MultiSelect
						items={[
							{ id: "react", label: "React", icon: <Code /> },
							{ id: "vue", label: "Vue", icon: <Code /> },
							{ id: "svelte", label: "Svelte", icon: <Code /> },
						]}
						value={multiVal}
						onChange={setMultiVal}
						placeholder="Select frameworks…"
					/>
				</Cell>
			</Section>

			{/* 7. Data */}
			<Section title="Data">
				<Cell name="DataGrid">
					<Button onClick={noop}>DataGrid (see story)</Button>
				</Cell>
				<Cell name="EmptyState">
					<EmptyState
						icon={<Search />}
						title="No results"
						description="Try adjusting your search."
					/>
				</Cell>
				<Cell name="FilterTabs">
					<FilterTabs
						value={filterTab}
						onChange={setFilterTab}
						items={[
							{ id: "all", label: "All", count: 12 },
							{ id: "active", label: "Active", count: 8 },
							{ id: "archived", label: "Archived", count: 4 },
						]}
					/>
				</Cell>
				<Cell name="List">
					<List variant="bordered">
						<ListItem leading={<Mail />}>Messages</ListItem>
						<ListItem leading={<Users />}>Team</ListItem>
					</List>
				</Cell>
				<Cell name="StatCard">
					<StatCard
						label="Total Users"
						value="2,350"
						trend="up"
						trendValue="+180"
						description="new this week"
						icon={<Users />}
					/>
				</Cell>
				<Cell name="Table">
					<Table size="sm">
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Role</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>Alice</TableCell>
								<TableCell>Admin</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Bob</TableCell>
								<TableCell>Editor</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Cell>
			</Section>

			{/* 8. Layout */}
			<Section title="Layout">
				<Cell name="AspectRatio">
					<AspectRatio ratio="video">
						<div
							style={{
								width: "100%",
								height: "100%",
								background: "var(--color-primary)",
								borderRadius: "var(--radius-md)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
							}}
						>
							16:9
						</div>
					</AspectRatio>
				</Cell>
				<Cell name="Card">
					<Card variant="outlined" padding="md">
						<Text size="sm">Card content</Text>
					</Card>
				</Cell>
				<Cell name="Container">
					<Container size="sm">
						<Text size="sm">Container</Text>
					</Container>
				</Cell>
				<Cell name="Divider">
					<Divider />
				</Cell>
				<Cell name="Grid">
					<Grid columns="2" gap="sm">
						<div
							style={{
								background: "var(--color-primary)",
								padding: "0.5rem",
								borderRadius: "var(--radius-sm)",
								color: "white",
								textAlign: "center",
							}}
						>
							1
						</div>
						<div
							style={{
								background: "var(--color-primary)",
								padding: "0.5rem",
								borderRadius: "var(--radius-sm)",
								color: "white",
								textAlign: "center",
							}}
						>
							2
						</div>
					</Grid>
				</Cell>
				<Cell name="PageHero">
					<Button onClick={noop}>PageHero (see story)</Button>
				</Cell>
				<Cell name="PageTransition">
					<Button onClick={noop}>PageTransition (see story)</Button>
				</Cell>
				<Cell name="Stack">
					<Stack direction="row" gap="sm">
						<Badge>A</Badge>
						<Badge variant="primary">B</Badge>
						<Badge variant="success">C</Badge>
					</Stack>
				</Cell>
			</Section>
		</div>
	);
}

const meta: Meta<typeof UIKit> = {
	title: "Design System / UI Kit Overview",
	component: UIKit,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;

export const Overview: StoryObj<typeof UIKit> = {};

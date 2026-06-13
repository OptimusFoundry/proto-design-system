import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
	// ── Rendering ──────────────────────────────────────────────────────────────

	it("renders the title", () => {
		render(<SectionHeader title="Campaign Performance" />);
		expect(screen.getByText("Campaign Performance")).toBeInTheDocument();
	});

	it("renders the eyebrow when provided", () => {
		render(<SectionHeader eyebrow="OVERVIEW" title="Campaign Performance" />);
		expect(screen.getByText("OVERVIEW")).toBeInTheDocument();
	});

	it("does not render an eyebrow element when omitted", () => {
		render(<SectionHeader title="Campaign Performance" />);
		// No element with aria-hidden + eyebrow text should exist
		expect(screen.queryByText(/overview/i)).not.toBeInTheDocument();
	});

	it("renders the description when provided", () => {
		render(
			<SectionHeader
				title="Signups"
				description="Track how your campaign is growing."
			/>,
		);
		expect(
			screen.getByText("Track how your campaign is growing."),
		).toBeInTheDocument();
	});

	it("does not render a description element when omitted", () => {
		render(<SectionHeader title="Signups" />);
		expect(screen.queryByText(/track how/i)).not.toBeInTheDocument();
	});

	it("renders the actions slot when provided", () => {
		render(
			<SectionHeader
				title="Members"
				actions={<button type="button">Invite</button>}
			/>,
		);
		expect(screen.getByRole("button", { name: "Invite" })).toBeInTheDocument();
	});

	it("does not render actions wrapper when actions prop is omitted", () => {
		render(<SectionHeader title="Members" />);
		// No button should be in the document
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	// ── Heading semantics ──────────────────────────────────────────────────────

	it("renders title as h2 by default", () => {
		render(<SectionHeader title="Default heading" />);
		const heading = screen.getByRole("heading", { level: 2 });
		expect(heading).toHaveTextContent("Default heading");
	});

	it('renders title as h3 when as="h3"', () => {
		render(<SectionHeader title="Sub section" as="h3" />);
		const heading = screen.getByRole("heading", { level: 3 });
		expect(heading).toHaveTextContent("Sub section");
	});

	it('renders title as h1 when as="h1"', () => {
		render(<SectionHeader title="Top level" as="h1" />);
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toHaveTextContent("Top level");
	});

	// ── Eyebrow accessibility ──────────────────────────────────────────────────

	it("marks the eyebrow span as aria-hidden", () => {
		render(<SectionHeader eyebrow="EYEBROW LABEL" title="Title" />);
		const eyebrow = screen.getByText("EYEBROW LABEL");
		expect(eyebrow).toHaveAttribute("aria-hidden", "true");
	});

	// ── Size variant ───────────────────────────────────────────────────────────

	it('renders without error in size="sm"', () => {
		render(<SectionHeader title="Small section" size="sm" />);
		expect(screen.getByText("Small section")).toBeInTheDocument();
	});

	it('renders without error in size="md" (default)', () => {
		render(<SectionHeader title="Medium section" size="md" />);
		expect(screen.getByText("Medium section")).toBeInTheDocument();
	});

	// ── className passthrough ──────────────────────────────────────────────────

	it("applies custom className to the root element", () => {
		const { container } = render(
			<SectionHeader title="Test" className="my-custom-class" />,
		);
		expect(container.firstChild).toHaveClass("my-custom-class");
	});

	// ── displayName ───────────────────────────────────────────────────────────

	it("has the correct displayName", () => {
		expect(SectionHeader.displayName).toBe("SectionHeader");
	});
});

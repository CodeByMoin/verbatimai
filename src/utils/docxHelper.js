import { Document, Paragraph, TextRun, Packer, HeadingLevel } from 'docx';

export const downloadWordDoc = ({ transcript, summary, title, filename }) => {
  const doc = new Document({
    title: title || 'Meeting Minutes',
    description: 'Generated by AutoMinutes',
    styles: {
      paragraphStyles: [
        {
          id: 'normal',
          name: 'Normal',
          run: {
            size: 24, 
          },
          paragraph: {
            spacing: {
              line: 276,
            },
          },
        },
        {
          id: 'heading1',
          name: 'Heading 1',
          run: {
            size: 32,
            bold: true,
            color: '2B579A',
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120,
            },
          },
        },
        {
          id: 'heading2',
          name: 'Heading 2',
          run: {
            size: 28,
            bold: true,
            color: '2B579A',
          },
          paragraph: {
            spacing: {
              before: 200,
              after: 100,
            },
          },
        },
      ],
    },
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: title || 'Meeting Minutes',
            heading: HeadingLevel.HEADING_1,
          }),
          ...(summary ? createSummarySection(summary) : []),
          ...(transcript ? createTranscriptSection(transcript) : []),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'meeting_minutes.docx';
    a.click();
    URL.revokeObjectURL(url);
  });
};

const createSummarySection = (summary) => {
  return [
    new Paragraph({
      text: 'Meeting Summary',
      heading: HeadingLevel.HEADING_2,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Attendees: ',
          bold: true,
        }),
        new TextRun({
          text: summary.attendees.join(', '),
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Duration: ',
          bold: true,
        }),
        new TextRun({
          text: summary.duration,
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: 'Sentiment: ',
          bold: true,
        }),
        new TextRun({
          text: summary.sentiment.charAt(0).toUpperCase() + summary.sentiment.slice(1),
        }),
      ],
    }),
    new Paragraph({
      text: 'Key Points',
      heading: HeadingLevel.HEADING_2,
    }),
    ...summary.key_points.map(point => new Paragraph({
      text: point,
      bullet: {
        level: 0,
      },
    })),
    new Paragraph({
      text: 'Action Items',
      heading: HeadingLevel.HEADING_2,
    }),
    ...summary.action_items.map(item => new Paragraph({
      text: item,
      bullet: {
        level: 0,
      },
    })),
    new Paragraph({
      text: 'Decisions Made',
      heading: HeadingLevel.HEADING_2,
    }),
    ...summary.decisions.map(decision => new Paragraph({
      text: decision,
      bullet: {
        level: 0,
      },
    })),
    new Paragraph({
      text: 'Next Meeting',
      heading: HeadingLevel.HEADING_2,
    }),
    new Paragraph({
      text: summary.next_meeting,
    }),
  ];
};

const createTranscriptSection = (transcript) => {
  return [
    new Paragraph({
      text: 'Full Transcript',
      heading: HeadingLevel.HEADING_2,
    }),
    ...transcript.split('\n').map(line => new Paragraph({
      text: line.trim(),
    })),
  ];
};
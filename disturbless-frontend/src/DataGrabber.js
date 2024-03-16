// It contains static data used in the home page, and the dashboard home page.

import React from "react";

import { Icon } from "@iconify/react";
import bulbFilled from "@iconify/icons-ant-design/bulb-filled";

import dashboardOutlined from "@iconify-icons/ant-design/dashboard-outlined";
import messagesAlt from "@iconify-icons/jam/messages-alt";
import bxPhone from "@iconify-icons/bx/bx-phone";
// import outlinePhoneForwarded from "@iconify-icons/ic/outline-phone-forwarded";
import creditCard from "@iconify-icons/bi/credit-card";
import outlineNotificationsActive from "@iconify-icons/ic/outline-notifications-active";
import bxUserCircle from "@iconify-icons/bx/bx-user-circle";
import signOut from "@iconify-icons/akar-icons/sign-out";
import commentVerify from "@iconify/icons-uil/comment-verify";

export function getReceivedMessageTableContent() {
  return {
    title: "Received messages",
    tableHeads: ["Date", "From", "Type", "Message"],
    rows: [
      [
        "06-07-2021",
        "(555) 555-1234",
        "SMS",
        "Lorem Ipsum is simply dummy text of the printing",
      ],
      [
        "06-07-2021",
        "(555) 555-1234",
        "SMS",
        "Lorem Ipsum is simply dummy text of the printing",
      ],
    ],
  };
}

export function getMessages() {
  return [
    {
      contact: "(555) 555-1234",
      messages: [
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "out",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "out",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "out",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "out",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "out",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "out",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
      ],
    },
    {
      contact: "(555) 555-1235",
      messages: [
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "out",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
        {
          sender: "out",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
      ],
    },
    {
      contact: "(555) 555-1236",
      messages: [
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
      ],
    },
    {
      contact: "(555) 555-1237",
      messages: [
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
      ],
    },
    {
      contact: "(555) 555-1238",
      messages: [
        {
          sender: "in",
          content: "Lorem Ipsum is simply dummy text of...",
          when: 1628205333,
        },
      ],
    },
  ];
}

export function getNumberDetails() {
  return [
    {
      number: "(555) 555-1234",
      country: "United States",
      label: "Registrations",
      billingMethod: "Card",
    },
    {
      number: "(555) 555-1235",
      country: "Norway",
      label: "Friends",
      billingMethod: "PayPal",
    },
    {
      number: "(555) 555-1236",
      country: "Uganda",
      label: "Work",
      billingMethod: "Cypto",
    },
    {
      number: "(555) 555-1237",
      country: "Greece",
      label: "Old",
      billingMethod: "Stripe",
    },
  ];
}

export function getSidebarLinks() {
  return [
    {
      path: "/dashboard/",
      name: "Dashboard",
      icon: dashboardOutlined,
    },
    {
      path: "/dashboard/inbox/",
      name: "Inbox",
      icon: messagesAlt,
    },
    // {
    //   path: "/dashboard/calls/",
    //   name: "Calls",
    //   icon: outlinePhoneForwarded,
    // },
    {
      path: "/dashboard/numbers/",
      name: "Numbers",
      icon: bxPhone,
    },
    {
      path: "/dashboard/verifiedId/",
      name: "Verified IDs",
      icon: commentVerify,
    },
    {
      path: "/dashboard/billing/",
      name: "Billing",
      icon: creditCard,
    },
    {
      path: "/dashboard/notifications/",
      name: "Notifications",
      icon: outlineNotificationsActive,
    },
    {
      path: "/dashboard/profile/",
      name: "Profile",
      icon: bxUserCircle,
    },
    {
      path: "/dashboard/logout",
      name: "Logout",
      icon: signOut,
    },
  ];
}

export function getTestimonials() {
  return [
    {
      testimonial: `"I travel a lot and often find myself sidelined by services who require SMS verification
              upon logging in. MumboLine solves this problem. I use a single number for all my online
              services now."`,
      by: "Jared",
      occupation: "Blogger",
    },
    {
      testimonial: `"I use MumboLine's virtual number to protect my primary number from annoying marketing SMS 
              messages and one-time events, for example posting ad on Craigslist"`,
      by: "Ingrid",
      occupation: "Etsy Seller",
    },
    {
      testimonial: `"I work in different countries and having a virtual U.S. number as a way of contact helps me 
              reaching new clients."`,
      by: "Josh",
      occupation: "Digital Marketer",
    },
  ];
}

export function getDashboardHomeTips() {
  return [
    {
      hint: `Welcome to MumboLine! using our services you’ll be well on your way to blocking off any unwanted advertising.
      Get started by choosing one of our phone numbers!`,
      icon: <Icon icon={bulbFilled} color="#5685ff" width="32" height="32" />,
    },
    {
      hint: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
    standard dummy text ever since the 1500s`,
      icon: <Icon icon={bulbFilled} color="#5685ff" width="32" height="32" />,
    },
  ];
}

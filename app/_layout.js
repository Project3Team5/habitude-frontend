import React from "react";
import { Stack } from "expo-router";
import { SubjectsProvider } from "../contexts/SubjectsContext";

export default function RootLayout() {
  return (
    <SubjectsProvider>
      <Stack />
    </SubjectsProvider>
  );
}

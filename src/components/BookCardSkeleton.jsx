import React from "react";
import { Flex, Box, Card, Skeleton } from "@radix-ui/themes";

export default function BookCardSkeleton() {
  return (
    <Card className="max-w-sm w-full border flex flex-col items-center shadow-md hover:shadow-lg bg-gray-100 rounded-sm py-4">
      <Box className="h-48 w-full">
        <Skeleton className="h-full w-full rounded-lg" />
      </Box>
      <Flex direction="column" align="center" className="mt-4 w-full">
        <Skeleton className="h-4 w-3/4 rounded-md mb-2" />
        <Skeleton className="h-3 w-1/2 rounded-md mb-2" />
        <Skeleton className="h-3 w-1/4 rounded-md mb-4" />
        <Flex gap="2" className="mt-1">
          <Skeleton className="h-10 w-20 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </Flex>
      </Flex>
    </Card>
  );
}

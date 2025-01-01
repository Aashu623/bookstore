"use client";

import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button, Flex } from "@radix-ui/themes";


const ConfirmDialog = ({ open, onClose, onConfirm }) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Trigger asChild>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <AlertDialog.Content className="fixed inset-0 max-w-md m-auto h-max p-6 bg-white rounded-lg shadow-lg">
          <AlertDialog.Title className="text-xl font-bold mb-4">Confirm Purchase</AlertDialog.Title>
          <AlertDialog.Description size="2" className="mb-4">
            Make sure that UTR number of payment is valid. If UTR number is invalid, your order will not be processed.
            Do you want to continue?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" onClick={onClose}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="soft" color="red" onClick={onConfirm}>
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ConfirmDialog;

import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spiner'
import { CRUD } from '@/api/crud'




const DeleteDialog = ({ id, name = 'data', apiUrl }: { id: string, name?: string, apiUrl?: string }) => {
    const destination = new CRUD(apiUrl || '');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) toast.error('id is missing');
        try {
            const message = await destination.delete(id);
            toast.success(message);
            setIsOpen(false);
            setIsLoading(true);
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            toast.error(msg);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='w-full text-left text-sm p-2 hover:bg-destructive/50  hover:border-destructive hover:text-white text-destructive rounded'>
                Delete
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleOnSubmit} className='space-y-6'>
                    <DialogHeader >
                        <DialogTitle className='text-xl'>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            You want to delete
                            <span className='font-semibold text-primary px-1'>{name}</span> from table
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" >
                            {isLoading ? (
                                <>
                                    <Spinner />
                                    Deleting...
                                </>
                            ) : "Delete"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog;

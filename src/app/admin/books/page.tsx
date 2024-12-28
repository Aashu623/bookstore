'use client';

import BookCard from '@/components/BookCard';
import { Flex, Grid, Separator, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import AddOrUpdateBook from '@/components/AddOrUpdateBook';
interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}

export default function AdminPage() {
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBooks = async () => {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <section className="py-10 text-center">
            <Text size={"3"} weight={"bold"} className="mb-6 text-gray-800">Admin - Manage Books</Text>
            <Grid columns={{ xs: "2", sm: "3", md: "4", lg: "5", xl: "6" }} gap={"6"}>
                {books.map((book) => (
                    <Flex direction="column" key={book._id}>
                        <BookCard
                            key={book._id}
                            book={book}
                            isAdmin={true}
                        />
                    </Flex>
                ))}
            </Grid>
            <Separator className="my-6" />
            <AddOrUpdateBook
                isUpdate={false}
                initialData={{}}
            />
        </section>
    );
}

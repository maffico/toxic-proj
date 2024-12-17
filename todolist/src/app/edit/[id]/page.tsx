'use client';

import React, { useEffect, useState } from 'react';
import Form from '@/components/Form/Form';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

const EditPage = ({ params }: EditPageProps) => {
  const [todoId, setTodoId] = useState<number | null>(null);

  useEffect(() => {
    const getParams = async () => {
      const gottenParams = await params;
      const id = parseInt(gottenParams.id, 10);
      setTodoId(id);
    };

    getParams();
  }, [params]);

  return <Form todoId={todoId} isEdit={true} />;
};

export default EditPage;

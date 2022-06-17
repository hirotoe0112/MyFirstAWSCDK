export const handler = async (
  event: any,
): Promise<any> => {
  return { 
    statusCode: 200,
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(
      {
        result:'delete'
      }
    )
  };
}
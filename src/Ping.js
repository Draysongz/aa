import React, {useState, useEffect} from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import * as web3 from '@solana/web3.js'
import { Flex, Box, Text, Input, Button, Heading } from '@chakra-ui/react'

const Ping = () => {
    const [balance, setBalance] = useState(0);
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState(0)

    const {connection} = useConnection()
    const {publicKey, sendTransaction} = useWallet()

    useEffect(()=>{
        if(!connection || !publicKey){
            return;
        }
        connection.onAccountChange(publicKey, (updatedInfo)=>{
            setBalance(updatedInfo.lamports/ web3.LAMPORTS_PER_SOL)
        }, "confirmed")

        connection.getAccountInfo(publicKey).then((info) => {
            setBalance(info.lamports/web3.LAMPORTS_PER_SOL);
          });

    }, [publicKey])

    const sendSol = async ()=>{
        if(!connection || !publicKey){
            return;
        }

        try {
            const transaction = new web3.Transaction()
            const send = web3.SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipient,
                lamports: amount * web3.LAMPORTS_PER_SOL,
            });
            transaction.add(send)

            await sendTransaction(transaction, connection).then((sig)=>{
                console.log(sig)
            })
        } catch (error) {
            
        }
    }


  return (
    <Flex
    background={'#FFFFFF'} 
    direction={'column'}>
        <Flex background={'#0088CC'} justifyContent={'space-between'} 
        alignItems={'center'} p={4} textAlign={'center'} color={'#333333'}>
            <Heading>SOL Sender</Heading>

            <WalletMultiButton />
        </Flex>

        <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} gap={10} p={10}>

            <Box>
                <Text color={'#333333'} fontSize={'2xl'}>Balance : {balance} sol </Text>
            </Box>
            <Flex color={'#333333'}  direction={'column'} justifyContent={'center'} alignItems={'center'} gap={4}>
                <Heading>Amount (in SOL) to send</Heading>
            <Input onChange={(e)=> setAmount(e.target.value)} value={amount} type='text' w={'45vw'} placeholder='Enter amount of sol to send' />

            <Heading>Recipient Address</Heading>
            <Input onChange={(e)=>setRecipient(e.target.value)} value={recipient} type='text' w={'45vw'} placeholder='Enter recipient&apos;s address' />

            <Button color={'#fff'}  bgColor={'#0088CC'} onClick={sendSol} w={'15vw'} isDisabled={!publicKey} borderRadius={'10px'}>Send</Button>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default Ping